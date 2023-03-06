import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Endpoints from '../constants/endpoints';
import { Conversation } from '../models/conversation.model';
import { SocketIoService } from '../shared/services/socket-io.service';
import { UtilsService } from '../shared/services/utils.service';

const apiUrl = `${Endpoints.urlBackend}/conversations`;

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  userId: string = '';
  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService
  ) {}

  getAllConversation(): Observable<Conversation[]> {
    this.userId = this.utilsService.getUserId();
    return this.httpClient.get<Conversation[]>(apiUrl + `/${this.userId}`, this.utilsService.httpOptions());
  }

  newConversation(receiver: string): Observable<Conversation> {
    this.userId = this.utilsService.getUserId();
    return this.httpClient.post<Conversation>(apiUrl, {
      senderId: this.userId,
      receiverId: receiver,
    }, this.utilsService.httpOptions());
  }
}
