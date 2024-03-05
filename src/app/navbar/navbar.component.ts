import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthenticatioService } from '../authenticatio.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  numberOfCartItems :string='0';
  islogin:boolean=false ;
  @ViewChild('navbar') navElement!:ElementRef
  @HostListener('window:scroll')
  onscroll(){
    if( scrollY > 500){
    this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
    this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
  }else{
    this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
    this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
  }
}

  constructor( private _Renderer2 :Renderer2, private _CartService:CartService, private _AuthenticatioService:AuthenticatioService , private _Router :Router){}

  ngOnInit(): void {
    this._AuthenticatioService.userdata.subscribe(res=>{
      if(this._AuthenticatioService.userdata.getValue()!=null){
        this.islogin=true
      }else{
        this.islogin=false;
      }
    })

    this._CartService.GetAllUsercartAPI().subscribe(
      res=>this.numberOfCartItems=res.numOfCartItems
    )



      //for know shanges on num of cart items (subscribe)
      this._CartService.numberofCartItems.subscribe(res=>this.numberOfCartItems =this._CartService.numberofCartItems.getValue())
     console.log('number of cart items from navbar', this.numberOfCartItems)
  }

  logout(){
    //local storage
    //islogin false
    //login
    localStorage.removeItem("userToken");
    this._AuthenticatioService.saveUserdDataService();
    this.islogin=false;
    this._Router.navigate(['/login']);
    
     /* 
     because if user logout and login after that with different email witout refresh
      it will number of cart items still the number before logout 
      untill service (subscribe) finish because it take time (async)
     */
    this.numberOfCartItems=''
    
  }

}
