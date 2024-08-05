import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-registerlibrary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './registerlibrary.component.html',
  styleUrl: './registerlibrary.component.css'
})
export class RegisterlibraryComponent implements OnInit {
  @Input() registerForm!:FormGroup;
  form!:FormGroup
constructor(){}
  ngOnInit(): void {
  }

}
