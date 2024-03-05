import { Component, OnInit } from '@angular/core';
import { PayService } from '../pay.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  cartId!: string;


  constructor(private _ActivatedRoute: ActivatedRoute, private _PayService: PayService) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(p => { this.cartId = p['cartId']; console.log('cart id from activate route', this.cartId) })
  }

  // payForm: FormGroup = new FormGroup({
  //   details: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  //   city: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  // })

  payForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),

    city: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),

    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  });


  submitPayBtn() {
    this._PayService.CheckoutSessionApi(this.cartId, this.payForm.value).subscribe({
      next: res => {
        console.log(res), console.log(res.session.url),
        window.location.href=res.session.url
      },
      error: err => {
        console.log('the error of response :', err)
      }
    })
  }




}
