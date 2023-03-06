import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import Endpoints from 'src/app/constants/endpoints';
import { Token } from 'src/app/models/token.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = `${Endpoints.urlBackend}/users`;
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {}

  existToken() {
    const token: string = this.cookieService.get('Token');
    if (!token) {
      return null;
    }
    const tokenData: Token = this.getDecodedAccessToken(token) as Token;
    if (tokenData && Math.floor(new Date().getTime() / 1000) < tokenData.exp) {
      return tokenData;
    } else if (
      tokenData &&
      Math.floor(new Date().getTime() / 1000) >= tokenData.exp
    ) {
      this.cookieService.delete('Token');
      this.refreshToken(tokenData.userId).subscribe({
        next: (Response: any) => {
          this.cookieService.set('Token', Response.token);
        },
        error: (error: any) => {
          this.cookieService.delete('Token');
        },
      });
      this.existToken();
    }
    return null;
  }

  private refreshToken(userId: string): Observable<any> {
    return this.httpClient.get(apiUrl + `/refreshToken/${userId}`);
  }

  getUserId(): string {
    const token: Token = this.existToken()!;
    console.log(token.userId);
    return token.userId;
  }

  private getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {}
  }

  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json',
        Authorization: 'Bearer ' + this.cookieService.get('Token'),
      }),
    };
  }

  dateCaculate(dateCreated: Date) {
    const date = new Date(dateCreated);
    const today = new Date();
    const milisecs = Math.floor(Date.now() - date.valueOf());
    const mins = milisecs / (1000 * 60);
    if (mins >= 0 && mins <= 1) {
      return 'just sent!';
    } else if (mins > 1 && mins < 60) {
      return Math.ceil(mins) + ' minutes ago';
    } else if (mins >= 60 && mins < 1440) {
      return Math.ceil(mins / 60) + ' hours ago';
    } else if (mins >= 1440) {
      return Math.ceil(mins / (60 * 24)) + ' days ago';
    } else {
      return null;
    }
  }
}
