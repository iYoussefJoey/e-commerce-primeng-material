import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if(localStorage.getItem('UserToken'))
    {
      return true;
    }
    else{
      router.navigate(['/login']);
      return false
    }
  
};
