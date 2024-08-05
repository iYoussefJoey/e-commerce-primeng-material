import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(localStorage.getItem('UserToken')!= null){
    router.navigate(['/home']);
    return false;
  } else{
    return true;
  }
};
