import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {

   
  numberofCartItems :BehaviorSubject <any> =new BehaviorSubject (null);

  constructor(private _HttpClient:HttpClient) { }


  
  addProductTocartAPI( pId:string):Observable<any>
   {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{ productId: pId} )
    }

  updateCartProductQuantityAPI( pId:string , count :number ):Observable<any>
  {
   return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`,{count: count} )
   }

  GetAllUsercartAPI() :Observable<any>
  {
   return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
   }

  RemoveSpecificCartItemAPI(pId : string ):Observable<any>
  {
   return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`)
   }

  ClearUserCartAPI():Observable<any>
  {
   return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart' )
   }

   
   getUserOrderAPI( userId:string):Observable<any>
  {
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}` )
   }


}
