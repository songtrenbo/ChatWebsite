import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  
  subscription: SubscriptionLike;
  user: User = new User('', '', '', '', '', '', '');

  constructor(
    private userService: UserService,
    private cookiesService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.subscription = this.userService.login(this.user).subscribe({
      next: (response: User) => {
        this.cookiesService.set('Token', response.token);
        this.router.navigate(["/home"]);
      },

      error: (error: any) => {
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Wrong email or password',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: error,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
