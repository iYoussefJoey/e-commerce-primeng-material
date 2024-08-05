import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null;
      }
  
      const passwordControl = control.parent.get(passwordControlName);
      const confirmPasswordControl = control;
  
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
  
      if (confirmPasswordControl.value !== passwordControl.value) {
        return { mismatch: true };
      }
  
      return null;
    };
  }