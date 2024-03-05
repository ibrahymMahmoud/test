import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategeriosService {

  constructor( private _HttpClient:HttpClient) { }

  getAllCategories( ):Observable<any>{
    
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')

  }


  getSpecificCategory(categeryId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categeryId}/subcategories`)
  }

  getAllSubCategories():Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/subcategories`)
  }


  getspecificSubCategory(categeryId:string):Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/subcategories/${categeryId}`)
  }


  getAllSubCategoriesOnCategory(categeryId:string):Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories/${categeryId}/subcategories`)
  }


}
