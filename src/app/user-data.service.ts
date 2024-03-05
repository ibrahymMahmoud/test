import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userId:BehaviorSubject <any> =new BehaviorSubject (null);

  constructor( private _HttpClient:HttpClient) { }

  getUserAddress():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/addresses')
  }



}
