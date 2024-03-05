import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { AuthenticatioService } from '../authenticatio.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerMassage!: string;
  spinnerLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    rePassword: new FormControl(''),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  }  , {validators:[this.checkMatchedPassword]} as FormControlOptions);



  constructor(private _AuthenticatioService: AuthenticatioService, private _Router: Router ) { }
  ngOnInit(): void {
    localStorage.setItem('currentPage', "/register")
    
  }

  checkMatchedPassword(form: any):void {

    if (form.get('rePassword')?.value == null || form.get('rePassword')?.value==""){
      form.get('rePassword').setErrors({ "required": true })
    }
    else if (form.get('password')?.value != form.get('rePassword')?.value) {
      
      form.get('rePassword').setErrors({ "matchedPassword": true })

    }
  }

  submintRegisterForm() {


    this.spinnerLoading = true

    this._AuthenticatioService.registerApiMethod(this.registerForm.value).subscribe(
      {
        next: (res) => {
          console.log(res)
          this.spinnerLoading = false
          this._Router.navigate(['/login'])
        },
        error: (err) => { console.log(err); this.spinnerLoading = false; this.registerMassage = err.error.message }

      }
    )


  }

}


