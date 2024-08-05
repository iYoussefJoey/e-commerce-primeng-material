import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartitemsService {
  numOfCartItems:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  constructor(private _http: HttpClient) {
    this.getCartData().subscribe({
      next:(res:any)=>{
        this.numOfCartItems.next(res.numOfCartItems)
        console.log(res)
      }
    })
  }
  addProductToCart(id: string): Observable<any> {
    console.log(id, 'from service', localStorage.getItem('UserToken'));
    return this._http.post<any>(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
     
    );
  }
  getCartData(): Observable<any> {
    console.log('from service', localStorage.getItem('UserToken'));
    return this._http.get<any>(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: `${localStorage.getItem('UserToken')}`,
      },
    });
  }
  upDateCartData(count: number, id: string): Observable<any> {
    console.log('from service', localStorage.getItem('UserToken'));
    return this._http.put<any>(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count },
     
    );
  }
  deleteItemCart(id: string): Observable<any> {
    console.log('from service', localStorage.getItem('UserToken'));
    return this._http.delete<any>(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
     
    );
  }
  deleteAllItemCart(): Observable<any> {
    console.log('from service', localStorage.getItem('UserToken'));
    return this._http.delete<any>(
      `https://ecommerce.routemisr.com/api/v1/cart`,
     
    );
  }

  processCheckOut(id: string, shippingAddress: any): Observable<any> {
    console.log('from service', localStorage.getItem('UserToken'));
    return this._http.post<any>(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress },
     
    );
  }
}
