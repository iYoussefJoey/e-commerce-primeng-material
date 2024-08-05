import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
prods:string=''
  constructor(private https:HttpClient) { }
  getCategories():Observable<any>{

    return this.https.get<Product[]>('https://ecommerce.routemisr.com/api/v1/categories')
  }
  getProductsOfCategory():Observable<any>{

    return this.https.get<Product[]>('https://ecommerce.routemisr.com/api/v1/products')
  }
  getSpecProduct(id:string):Observable<any>{

    return this.https.get<Product[]>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
}
