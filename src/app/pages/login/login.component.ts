import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterformComponent } from "../../../../projects/my-lib/src/lib/registerform/registerform.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { AuthapiService } from '../../services/authapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RegisterformComponent,MatCardModule,MatButtonModule,MatProgressSpinnerModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authapi:AuthapiService , private router:Router) {}
  isLoading:boolean=false;
  apiError:string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
    ]),
  });

  submitLogin(loginHere: FormGroup) {
    console.log(loginHere.value);
    this.apiError = '';
    if(loginHere.valid && !this.isLoading){
    this.isLoading = true;
    this.authapi.signIn(loginHere.value).subscribe({
      next: (data) => {
        if (data.message === 'success') {
          this.isLoading = false;
          localStorage.setItem('UserToken',data.token)
          this.authapi.setToken()
          this.router.navigate(['/home']);
          console.log(data);
        }},
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.apiError = err.error.message;
        },
      
    })
  }}
}
