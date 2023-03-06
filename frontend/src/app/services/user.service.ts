import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Endpoints from '../constants/endpoints';
import { User } from '../models/user.model';
import { UtilsService } from '../shared/services/utils.service';

const apiUrl = `${Endpoints.urlBackend}/users`;
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient, private utilsService: UtilsService) { }

  login(user: User): Observable<User>{
    return this.httpClient.post<User>(apiUrl + '/login', user);
  }

  register(user:User): Observable<User>{
    return this.httpClient.post<User>(apiUrl + '/register', user);
  }

  getUserData(userId: string): Observable<User>{
    return this.httpClient.get<User>(apiUrl + `/userData/${userId}`, this.utilsService.httpOptions());
  }

  searchUser(searchString: string): Observable<User[]>{
    return this.httpClient.get<User[]>(apiUrl + `/search/${searchString||undefined}`, this.utilsService.httpOptions());
  }

  updateUserProfile(formData: any): Observable<any>{
    return this.httpClient.post(apiUrl + `/updateProfile`,formData);
  }
}
