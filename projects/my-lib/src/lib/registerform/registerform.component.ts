import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Type } from '@angular/compiler';

@Component({
  selector: 'lib-registerform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css',
})
export class RegisterformComponent implements OnInit {
  public registerForm!: FormGroup;
  public control!: FormControl;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() validations: any;
  @Input() placeholder!: string;
  @Input() type!: string;
  // @Output() consoleRegister = new EventEmitter<string>()
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit() {
    this.registerForm = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.registerForm.get(this.controlName);
  }
  keyPress(event: KeyboardEvent) {
    const pattern = /[-.+0-9]$/;
    const number = Type.length;
    const inputChar = String.fromCharCode(event.charCode);
    if (this.type == 'number') {
      if (!pattern.test(inputChar)) {
        event.preventDefault(); // invalid character prevent input
      }
    }
  }

  
  getErrors(): string[] {
    if(this.control && this.control.dirty && this.control.invalid){
      let errors = this.control?.errors;
    // console.log('Error titles:', errorTitles);
      if(errors){
      
        return Object.keys(errors);
      }
    }
    return [];
  }

  // outputMessage(){
  //   this.consoleRegister.emit('hello!')
  // }
}
