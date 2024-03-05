import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProudctsService } from '../proudcts.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  specificProductId! :string;
  specificProductData! :any;

  constructor(  private toastEvokeService: ToastEvokeService, private _ActivatedRoute:ActivatedRoute , private _ProudctsService:ProudctsService ,private _CartService:CartService){}

  ngOnInit(): void {

   this._ActivatedRoute.params.subscribe(id=>this.specificProductId = id['specificProductId'])
   this._ProudctsService.getSpecificProductMethod(this.specificProductId).subscribe(res=>{this.specificProductData= res.data
  console.log('data of specific product', this.specificProductData)})
  }


  addProductToCart(pId:string){
    this._CartService.addProductTocartAPI(pId).subscribe(res=>console.log(res))
    this.toastEvokeService.success('success', 'Product added successfully to your cart').subscribe();
     this._CartService.numberofCartItems.next(this.specificProductData.numOfCartItems)

  }










  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: true
  }

}
