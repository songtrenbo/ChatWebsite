import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, SubscriptionLike } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/app/constants/environment';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { SocketIoService } from 'src/app/shared/services/socket-io.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css'],
})
export class ChatContentComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy
{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  conversationId: string = '';
  subscription: SubscriptionLike;
  messages: Message[] = [];
  newMessage: Message = new Message('', '', '', new Date());
  messageContent: string;
  messageLimit: number = 0;
  isAllMessages: boolean = false;
  messagesLength: number = 0;
  socket: Socket;
  message: Message;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private socketIoService: SocketIoService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params: Params) => {
      this.conversationId = params['conversationId'].toString();
    });
  }

  ngOnInit(): void {
    // this.socketIoService.setupSocketConnection();
    this.socketIoService.returnMessage.subscribe(value => {
      if(value.conversationId === this.conversationId){
        this.messages.push(value);
      }
    })
    this.loadMessages();
  }

  ngAfterViewInit(): void {
    this.srollToBottom();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
    this.srollToBottom();
  }

  ngOnDestroy(): void {
    this.socketIoService.disconnect();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadMessages(): void {
    this.messageLimit += 10;
    this.subscription = this.messageService
      .getAllMessage(this.conversationId, this.messageLimit)
      .subscribe((res: Message[]) => {
        this.messages = res;
        if (this.messagesLength === this.messages.length) {
          this.isAllMessages = true;
        } else {
          this.messagesLength = this.messages.length;
        }
      });
  }

  srollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollBottom =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  createNewMessage() {
    try {
      this.newMessage.conversationId = this.conversationId;
      this.newMessage.sender = this.utilsService.getUserId();
      this.newMessage.text = this.messageContent;
      this.subscription = this.messageService
        .newMessage(this.newMessage)
        .subscribe((res: Message) => {
          if(!res){
            console.log(res);
          }
        });
      this.messageContent = '';
    } catch (err) {
      console.log(err);
    }
  }
}
