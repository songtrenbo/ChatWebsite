import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: User = new User('', '', '', '', '', '', '');
  RegisterForm: FormGroup;
  subscription: SubscriptionLike;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  register(){
    this.user = {
      _id:"",
      email: this.RegisterForm.get('email')?.value,
      name: this.RegisterForm.get('name')?.value,
      password: this.RegisterForm.get('password')?.value,
      confirmPassword:"",
      profilePicture:"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      token:"",
    }
    this.subscription = this.userService.register(this.user).subscribe({
      next: (Response: any) =>{
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully',
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.navigate(["/login"]);
      },
      error: (error: any) => {
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Email already been used!',
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
    })
  }
}
