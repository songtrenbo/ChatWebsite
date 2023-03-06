import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { DropdownDirective } from './directives/dropdown.directive';


@NgModule({
  declarations: [
    MessageComponent,
    ChatItemComponent,
    DropdownDirective
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    MessageComponent,
    ChatItemComponent,
    DropdownDirective
  ]
})
export class SharedModule { }
