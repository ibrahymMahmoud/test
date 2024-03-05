import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProudctsService implements OnInit {

  
  

  constructor(private _HttpClient: HttpClient) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class 
  }

  getAllProductsMethod(pageNumber:number=1): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`)
  }



  getSpecificProductMethod(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


  addProductToWishlistAPi(pId :string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ productId: pId})
  }

  getloggedUserWishlist():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist")

  }

  removeFromWishlist(pId:string ):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pId}`)

  }

}
