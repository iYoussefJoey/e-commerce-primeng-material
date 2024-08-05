import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-my-lib',
  standalone: true,
  imports: [CommonModule,],
  template: `
    <p>
      my-lib works!
    </p>
  `,
  styles: ``
})
export class MyLibComponent {
 
  static getErrors(registerForm: FormGroup,ctrlName: string): string[] {
    let ctrl = registerForm.get(ctrlName);
    if(ctrl && ctrl.dirty && ctrl.invalid){
      let errors = ctrl?.errors;
      if(errors){
        return MyLibComponent.getErrorTitle(errors);
      }
    }
    return [];
  }
 

  static getErrorTitle(dictionary: any): string[]{
    let errors: string[] = [];
    Object.keys(dictionary).forEach((key) => {
      if (dictionary[key]) {
        errors.push(key);
      }
    });
    return errors;
  }
     
  //     let errorMessage = this.getErrors(key,dictionary[key]);
  //     if(errorMessage){
  //     // console.log(key, dictionary[key]);
  //     errors.push(key);
  //     }    });
  //   return errors;
  // }

  constructor(public registerForm: FormGroup) { }
}
