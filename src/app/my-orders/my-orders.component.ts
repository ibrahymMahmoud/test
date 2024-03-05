import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { UserDataService } from '../user-data.service';



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

 userId:string="";
 orders:any;
 ordersItems:any;
constructor(private _CartService:CartService , private _UserDataService:UserDataService){

}
ngOnInit(): void {

 
    
    
    
    


  this._CartService.GetAllUsercartAPI().subscribe(
  {  
   next: res => {
    console.log('response of get all cart items',res);
    console.log('fact user id ',this.userId)
    this.userId = res.data.cartOwner;



    this._CartService.getUserOrderAPI(this.userId).subscribe(
      {
        
        next:res=>{console.log( "response of get user order  ",res);
        this.orders=res;
        console.log( "------items------  ",res[0].cartItems );
        console.log( "user id from order  ",this.userId );
                   },
        error:err=>{console.log( 'no response of order but errors get user order',err)}
      }
    )

},

error:err=>{console.log('the message of response ',err.error.message.split(' ')?.slice(6,)?.join(''))
 
this.userId = err.error.message.split(' ')?.slice(6,)?.join('');


this._CartService.getUserOrderAPI(this.userId).subscribe(
  {
    
    next:res=>{console.log( "response of get user order  ",res);
    this.orders=res;
    console.log( "------items------  ",res[0].cartItems );
    console.log( "user id from order  ",this.userId );
               },
    error:err=>{console.log( 'no response of order but errors get user order',err)}
  }
)


}


}





)











}


}
