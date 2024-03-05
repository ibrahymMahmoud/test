import { Component, OnInit } from '@angular/core';
import { AuthenticatioService } from '../authenticatio.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
 




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errormessage!: string
  loadingSpinner: boolean = false
  forgetPasswordflag: boolean = true
  VerifyCodeFlag: boolean = false
  newPasswordFlag: boolean = false
  finishNewpasswordFlag : boolean = false

  ngOnInit(): void {
    localStorage.setItem('currentPage',"/login")
   
    
  }

  constructor(private _authenticationService: AuthenticatioService, private _Router: Router /*,private _CartService:CartService*/) { }

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.minLength(6), Validators.maxLength(10)])
  })

  loginSubmint() {
    this.loadingSpinner = true
    this._authenticationService.loginApi(this.loginform.value).subscribe({
      next: res => {
        this.loadingSpinner = false
        if (res.message == "success") {
          localStorage.setItem("userToken", res.token)
          this._authenticationService.saveUserdDataService()
          this._Router.navigate(['/home'])

          console.log('response of login ', res)

        }


      },
      error: err => { console.log(err); this.loadingSpinner = false; this.errormessage = err.error.message }
    })
  }

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  })

  forgetPasswordSubmint() {
    this.loadingSpinner = true
    this._authenticationService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next: res => {
        console.log(res)
        this.forgetPasswordflag = false
        this.loadingSpinner = false
        this.VerifyCodeFlag = true
      },
      error: err => {
        console.log(err)
        this.loadingSpinner = false
      }
    })
  }

  VerifyResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.minLength(6)])
  })

  VerifyResetCodeSubmint() {
    this.loadingSpinner = true
    this._authenticationService.VerifyResetCode(this.VerifyResetCodeForm.value).subscribe(
      {

        next: res => {
          console.log(res), this.loadingSpinner = false
          this.VerifyCodeFlag = false
          this.newPasswordFlag = true
        },
        error: err => { console.log(err), this.loadingSpinner = false }
      }
    )
  }

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
  })

  resetPasswordSubmint() {
    this.loadingSpinner = true
    this._authenticationService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: res => {
        console.log(res)
        this.loadingSpinner = false
        localStorage.setItem("userToken", res.token)
        this.finishNewpasswordFlag=true
        this._Router.navigate(['/home'])
      },
      error: err => {
        console.log(err)
        this.loadingSpinner = false
      }
    })
  }


}
