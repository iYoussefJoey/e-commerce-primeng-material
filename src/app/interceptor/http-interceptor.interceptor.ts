import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const token = localStorage.getItem('UserToken');
  console.log('Original Request:', req);
  console.log('Token:', token);

  loaderService.show();

    const clonedRequest = req.clone({
      headers: req.headers.set('token', `${token}`)
    });
    console.log('Cloned Request:', clonedRequest);
    return next(clonedRequest).pipe(
      finalize(() => loaderService.hide())
    );
};