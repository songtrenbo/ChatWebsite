import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Token } from 'src/app/models/token.model';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token: Token = new Token('', '', '', 0, 0, '');

  constructor(
    private utilsService: UtilsService,
    private cookiesService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin();
  }

  isLogin(): Token {
    this.token = this.utilsService.existToken()!;
    return this.utilsService.existToken()!;
  }
  logOut(): Token {
    try {
      this.cookiesService.delete('Token');
      this.router.navigate(['/home']);
      return (this.token = new Token('', '', '', 0,0, ''));
    } catch (err) {
      return this.token;
    }
  }
}
