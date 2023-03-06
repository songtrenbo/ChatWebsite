import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Endpoints from '../constants/endpoints';
import { Message } from '../models/message.model';
import { SocketIoService } from '../shared/services/socket-io.service';
import { UtilsService } from '../shared/services/utils.service';

const apiUrl = `${Endpoints.urlBackend}/messages`;

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  userId: string = '';
  constructor(private httpClient: HttpClient, private socketIoService: SocketIoService, private utilsService: UtilsService) { }

  getAllMessage(conversationId: string, messageLimit: number): Observable<Message[]>{    
    return this.httpClient.get<Message[]>(apiUrl + `/${conversationId}/limit=${messageLimit}`, this.utilsService.httpOptions());
  }

  newMessage(message: Message): Observable<Message>{
    this.socketIoService.newMessage(message);
    return this.httpClient.post<Message>(apiUrl, message, this.utilsService.httpOptions());
  }

}
