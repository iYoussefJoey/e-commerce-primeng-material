import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading:boolean = false;
  //cant think of any solution now!


  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(01)[0125].[0-9]{8}$'),
    ]),
  },{validators:this.matchingPasswords});
  submitRegitser(registerHere: FormGroup) {
    console.log(registerHere);
  }
  matchingPasswords(regFrom: any) {
    let passwordone = regFrom.get('password');
    let passwordTwo = regFrom.get('rePassword');
    if (passwordone.value === passwordTwo.value) {
      return null;
    }
    else{
      passwordTwo.setErrors({confirmPassword : 'Confirm password doesnt match'})
      return  {confirmPassword : 'Confirm password doesnt match'}
    }
}
}

// ^                         Start anchor
// (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
// (?=.*[!@#$&*])            Ensure string has one special case letter.
// (?=.*[0-9].*[0-9])        Ensure string has two digits.
// (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
// .{8}                      Ensure string is of length 8.
// $                         End anchor.








