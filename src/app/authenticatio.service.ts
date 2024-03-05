
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



interface userDataInterface {
  name?: string;
  email: string;
  password?: string;
  rePassword?: string;
  phone?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticatioService {

  userdata: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpclient: HttpClient , private _Router :Router) {
    // if (localStorage.getItem("currentPage")){
    //   this._Router.navigate([localStorage.getItem("currentPage")])
    // }
   }

  registerApiMethod(registerData: userDataInterface): Observable<any> {
    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', registerData)
  }
  loginApi(loginform: userDataInterface): Observable<any> {

    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginform)

  }

  saveUserdDataService(){
    
    if (localStorage.getItem('userToken')) {
      this.userdata.next(localStorage.getItem("userToken"));
      this.userdata.next(jwtDecode(this.userdata.getValue()));
      console.log(this.userdata)
    }else{
      localStorage.removeItem('userToken')
    }
  }
  forgetPassword(email: userDataInterface): Observable<any> {
    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', email)
  }
  VerifyResetCode(resetCode: string): Observable<any> {
    return this._httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', resetCode)

  }
  resetPassword(resetPasswordForm: userDataInterface): Observable<any> {
    return this._httpclient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', resetPasswordForm)
  }



}
