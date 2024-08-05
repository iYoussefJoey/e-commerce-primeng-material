import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthapiService } from '../../services/authapi.service';
import { RegisterlibraryComponent } from '../registerlibrary/registerlibrary.component';
import { MyLibComponent } from '../../../../projects/my-lib/src/lib/my-lib.component';
import { RegisterformComponent } from '../../../../projects/my-lib/src/public-api';
import { MatButtonModule } from '@angular/material/button';
import { passwordMatchValidator } from 'my-lib';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RegisterlibraryComponent,
    MyLibComponent,
    FormsModule,
    ReactiveFormsModule,
    RegisterformComponent,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
],

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy{
  isLoading: boolean = false;
   registerForm!: FormGroup;
  apiError: string = '';
  subObject:Subscription | undefined;
  

  constructor(
    private signService: AuthapiService,
    private formBuilder: FormBuilder,
    private _router:Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
        passwordMatchValidator('password'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(01)[0125][0-9]{8}$'),
      ]),
      postalCode: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$')]),
      address: new FormControl(null),
      city: new FormControl(null),
    });
  
  }
  // childData:string =''
  // consoleRegister(message: string) {
  //   console.log('hellofrom the toher side'+message);
  //   this.childData = message
  // }
  
  submitRegitser(registerForm: FormGroup) {
    console.log(registerForm.value);
    this.markAllControls(registerForm);
    this.apiError = '';
    if (registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.subObject = this.signService.signUp(registerForm.value).subscribe({
        next: (data) => {
          if (data.message === 'success')
          { this.isLoading = false;
            this._router.navigate(['/home']);
          console.log(data);}
        },
        error: (err) => { this.apiError= err.error.message;
          this.isLoading = false;
        }
      });
    //  this.subObject.add(() => {console.log('completed')})
      
    }
    // if ( registerHere.value.isInValid ) {

    // }else {
    // this.isInValid = true;}  // this is not the best solution using isInValid property
  }

  markAllControls(form: FormGroup) {
    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markAllControls(control);
      }
    });
  }


  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
    if(this.subObject){
    this.subObject.unsubscribe();
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
