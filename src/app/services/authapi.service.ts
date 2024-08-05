import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Montag } from '../interfaces/montag';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class AuthapiService {
UserToken:BehaviorSubject<string>=new BehaviorSubject<string>('')
numOfCartItems:number=0
setToken(){
  let token = JSON.stringify(localStorage.getItem('UserToken'))
  this.UserToken.next(token)
}
  constructor(private http: HttpClient, private router:Router) {
    if(localStorage.getItem('UserToken')){
      this.UserToken.next(JSON.stringify(localStorage.getItem('UserToken')))
    }
  }
  signUp(info: any): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      info
    );
  }
  signIn(info: any): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      info
    );
  }

  getProducts(): Observable<any> // when i add <product[]> it gets error on home component and doesnt show products whats the errror? need to ask mostafa
  {
    return this.http.get<Product[]>('https://ecommerce.routemisr.com/api/v1/products')
  }
  









  signOut(){
    localStorage.removeItem('UserToken')
    this.UserToken.next('')
    this.router.navigate(['/login'])
  }
}
