import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() message: Message;
  userId: string = '';
  user: User = new User('','','','','','','');
  subscription: SubscriptionLike;

  constructor(private utilsService: UtilsService, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.utilsService.getUserId();
    this.subscription = this.userService.getUserData(this.message.sender).subscribe((res: User)=>{
      this.user = res;
    })
    console.log("times")
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
