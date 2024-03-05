import { Component, OnInit } from '@angular/core';
import { ProudctsService } from '../proudcts.service';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';



@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})

export class WishListComponent implements OnInit {

  wishsItems:any;
  addLoading:string='';
  removeLoading:string='';
  count:number=0;


  constructor(private _ProudctsService:ProudctsService ,  private toastEvokeService: ToastEvokeService,private _CartService:CartService){

  }

  ngOnInit(): void {
    
    this._ProudctsService.getloggedUserWishlist().subscribe(res=>{console.log('response of get all wish items',  res);this.wishsItems=res.data
    console.log('number of wish items',  res.count);}) 
  }

  RemoveFromWishBtn(pId:string){
    this.removeLoading=pId;

    this._ProudctsService.removeFromWishlist(pId).subscribe({ 
      next : res=>{ 
       
        this._ProudctsService.getloggedUserWishlist().subscribe(res=>{console.log(res.data);this.wishsItems=res.data ; this.removeLoading='';})     
      } ,
      error:err=>console.log(err)
      
      
    })
  }

  addProductToCartBtn(productId: string) {
    this.addLoading=productId;

    console.log('id of the product that added to cart', productId)
    this._CartService.addProductTocartAPI(productId).subscribe((res) =>{ console.log('response of add to cart', res )
    this.toastEvokeService.success('success', 'Product added successfully to your cart').subscribe();
    this.addLoading ='' ;
    this._CartService.numberofCartItems.next(res.numOfCartItems)
  } )}



}
