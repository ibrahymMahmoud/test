import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PayService {

  baseUrl:string = `https://ecommerce.routemisr.com`;
  

  constructor(private _HttpClient:HttpClient) { }

  CheckoutSessionApi(cartId:string , payForm :any ):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`
    , {shippingAddress: payForm })
  }
}
