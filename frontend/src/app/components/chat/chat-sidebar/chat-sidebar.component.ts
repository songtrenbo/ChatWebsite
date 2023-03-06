import { Component, OnDestroy, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/conversation.model';
import { ConversationService } from 'src/app/services/conversation.service';
import { debounceTime, delay, filter, fromEvent, interval, map, SubscriptionLike, switchMap, timeInterval } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { SocketIoService } from 'src/app/shared/services/socket-io.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css'],
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  memberId: string[] = [];
  subscription: SubscriptionLike;
  senderId: string = '';
  users: User[] = [];
  searchText: string;
  constructor(
    private conversationService: ConversationService,
    private utilsService: UtilsService,
    private userService: UserService,
    private socketIoService: SocketIoService
  ) {}

  ngOnInit(): void {
    this.senderId = this.utilsService.getUserId();
    this.getConversation();
    const $searchBox = document.getElementById('search-box') as HTMLElement;
    fromEvent($searchBox, 'input').pipe(
      map(e=>(e.target as HTMLInputElement).value),
      debounceTime(1_000),
      switchMap(x=>this.userService.searchUser(this.searchText))
    ).subscribe((res: User[])=>{
      this.users = res;
    })
    this.socketIoService.setupSocketConnection();
    this.socketIoService.returnConversation.subscribe(data=>{
      for (let i = 0; i < data.members.length; i++) {
        if(data.members[i]===this.senderId){
          data.members.splice(i,1);
        }
      }
      this.conversations.push(data);
    })
  }

  getConversation() {
    this.subscription = this.conversationService
      .getAllConversation()
      .subscribe((res: Conversation[]) => {
        this.conversations = res;

        for (let conversation of this.conversations) {
          for (let i = 0; i < conversation.members.length; i++) {
            if(conversation.members[i]===this.senderId){
              conversation.members.splice(i,1);
            }
          }
        }

      });
  }

  newConversation(receiver: string){
    console.log("this is receiver: ",receiver);
    this.subscription = this.conversationService.newConversation(receiver).subscribe((res: Conversation)=>{
      this.socketIoService.newConversation(res);
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Add new conversation successfully!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Something wrong',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
  }
  
  ngOnDestroy() {
    this.socketIoService.disconnect();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
