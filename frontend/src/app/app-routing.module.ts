import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContentStartComponent } from './components/chat/chat-content-start/chat-content-start.component';
import { ChatContentComponent } from './components/chat/chat-content/chat-content.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatItemComponent } from './shared/components/chat-item/chat-item.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'chat', component: ChatComponent, children:[
    {path: '', component: ChatContentStartComponent},
    {path: ':conversationId', component: ChatContentComponent},
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
