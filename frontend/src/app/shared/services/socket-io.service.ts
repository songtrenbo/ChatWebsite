import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/app/constants/environment';
import { Conversation } from 'src/app/models/conversation.model';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket: Socket;
  message: Message = new Message('','','',new Date);
  conversation: Conversation = new Conversation('',[]);
  returnMessage: BehaviorSubject<Message> = new BehaviorSubject<Message>(this.message);
  returnConversation: BehaviorSubject<Conversation> = new BehaviorSubject<Conversation>(this.conversation);
  constructor() { }

  
  setupSocketConnection(){
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('broadcast', (data:string)=>{
      console.log(data);
      this.message = JSON.parse(data);
      this.returnMessage.next(this.message);
    })
    this.socket.on('conversation broadcast', (data: string)=>{
      this.conversation = JSON.parse(data);
      this.returnConversation.next(this.conversation);
    })
  }

  disconnect(){
    if(this.socket){
      this.socket.disconnect();
    }
  }

  newMessage(message: Message){
    return this.socket.emit('message', JSON.stringify(message));
  }

  newConversation(conversation: Conversation){
    console.log(conversation);
    return this.socket.emit('conversation', JSON.stringify(conversation));
  }
}
