import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { SocketIoService } from '../../services/socket-io.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css'],
})
export class ChatItemComponent implements OnInit, OnDestroy {
  @Input() userId: string;
  @Input() conversationId: string;
  user: User = new User('', '', '', '', '', '', '');
  subscription: SubscriptionLike;
  message: Message = new Message('','','',new Date);
  constructor(private utilsService: UtilsService ,private userService: UserService, private socketIoService: SocketIoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.socketIoService.returnMessage.subscribe(value => {
      if(value.conversationId === this.conversationId){
        this.message = value;
      }
    })
    if(this.conversationId){
      this.GetLastMessage();
      this.GetUserData();
    }
  }

  GetLastMessage(){
    this.subscription = this.messageService.getAllMessage(this.conversationId, 1).subscribe((res: Message[])=>{
      console.log(res);
      if(res.length>0){
        this.message = res[0];
      }
      else{
        this.message = new Message('','','',new Date);
      }
    })
  }
  GetUserData() {
    this.subscription = this.userService
      .getUserData(this.userId)
      .subscribe((res: User) => {
        this.user = res;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  dateCaculate(dateCreated: Date) {
    return this.utilsService.dateCaculate(dateCreated);
  }
}
