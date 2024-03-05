import { Component, OnInit } from '@angular/core';
import { AuthenticatioService } from '../authenticatio.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  errormessage!: string
  loadingSpinner: boolean = false
  forgetPasswordflag: boolean = true
  VerifyCodeFlag: boolean = false
  newPasswordFlag: boolean = false
  finishNewpasswordFlag : boolean = false

  ngOnInit(): void {
    localStorage.setItem('currentPage',"/forgetPass")
  }

  constructor(private _authenticationService: AuthenticatioService, private _Router: Router /*,private _CartService:CartService*/) { }

  

  

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
