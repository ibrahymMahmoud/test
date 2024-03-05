import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';

CartService
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {



  cartItems: any = [];
  cartId: string = '';
  totalCartPrice:number =0;

  constructor(private _CartService: CartService, private toastEvokeService: ToastEvokeService ,private _Router:Router) { }
  ngOnInit(): void {

    localStorage.setItem('currentPage', '/cart')
    this._CartService.GetAllUsercartAPI().subscribe(
    {
       next : res => {
      console.log('response of get all cart items',res);
      this.totalCartPrice = res.data.totalCartPrice;
      console.log('products in cart which i loop to display',res.data.products);
      console.log('cart id',res.data._id);
      this.cartItems = res.data.products;
      this.cartId = res.data._id
    },
    

    error : err=>console.log(err)
    }
    
    
    
    )
  }


  RemoveSpecificCartItemBtn(pId: string) {
    this._CartService.RemoveSpecificCartItemAPI(pId).subscribe(res => {
      this.cartItems = res.data.products;
      // Type DANGER
      this.toastEvokeService.danger('success', 'item deleted Successfully').subscribe();
      console.log('deleted product item id', pId);
      this.totalCartPrice = res.data.totalCartPrice;
      console.log('response of remove specific item from cart', res);
      this._CartService.numberofCartItems.next(res.numOfCartItems)

    })
  }

  updateCartProductQuantity(pid: string, count: number) {



    this._CartService.updateCartProductQuantityAPI(pid, count).subscribe(
      res => {

        if (count > 0) {

          console.log(res)
          console.log('product di = ', pid, '  count = ', count)
          this._CartService.numberofCartItems.next(res.numOfCartItems)
          this.cartItems = res.data.products;
          this.totalCartPrice = res.data.totalCartPrice;
        } else {
          this.RemoveSpecificCartItemBtn(pid)
          this.totalCartPrice = res.data.totalCartPrice;

        }



      }
    )
  }


  getUserOrder(userId:string){
    this._CartService.getUserOrderAPI(userId).subscribe(
      {
        next:res=>{console.log(res)},
        error:err=>{console.log(err)}
      }
    )
  }

  clearCart(){
    this._CartService.ClearUserCartAPI().subscribe(
      
   res=>{
    this._Router.navigate(['/home'])
 })
  }



}
