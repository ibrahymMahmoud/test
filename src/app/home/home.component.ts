import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { ProudctsService } from '../proudcts.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from '../cart.service';
import { CategeriosService } from '../categerios.service';
import { UserDataService } from '../user-data.service';
import { AuthenticatioService } from '../authenticatio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  searchValue: string = "";
  allproducts!: any;
  wishesItems: string[]=[]; 
  idOfProductInCart: string[] = [];
  allCategerios: any[]=[];
  //for pagintion
  pageSizeProducts!:number;
  currentPageOfProducts:number=1;
  totalProducts!:number;
  // for btn and heart icon
  isloading:string='no' ;
  isloadingHeart:string='no' ;
  isloadingHeartAdd:string='no' ;
 

  
 




  constructor(private _AuthenticatioService:AuthenticatioService, private _CartService: CartService, private toastEvokeService: ToastEvokeService, private _ProudctsService: ProudctsService, private _CategeriosService: CategeriosService , private _UserDataService:UserDataService) {
       console.log('hi from constructor')
  }

  ngOnInit(): void {

    //to retun to current page when refresh or reload 
    localStorage.setItem('currentPage', "/home")
    // play all product 
    this._ProudctsService.getAllProductsMethod().subscribe(res => {
      this.allproducts = res.data
      console.log(this.allproducts)
      console.log( 'response of get all products' , res)

      //for pagintion
      this.currentPageOfProducts = res.metadata.currentPage;   
      this.totalProducts = res.results      
      this.pageSizeProducts = res.metadata.limit
    });
      
    //for first slider in home (categery slider)
    this._CategeriosService.getAllCategories().subscribe(res => {
      console.log('response of get all categoris ', res.data);
      this.allCategerios = res.data
      console.log('response of get all categoris ' , res.data)
    })

    // for get values of id and store in wishesitems array  to display after refresh automatic because i did *ngif array include(product id)
    this._ProudctsService.getloggedUserWishlist().subscribe(res=>{
      console.log('ssssss response of get all wish items',  res.data);

      for (var i = 0; i < res.data.length; i++) {

          this.wishesItems.push(res.data[i].id);
          
      }
    
      console.log('arry that i push id of wish element',this.wishesItems)
      console.log('hi from ngoninit')
    
    
    }) 

    // to store values of id of cart products in array to correct display which button (delete-add)  
    this._CartService.GetAllUsercartAPI().subscribe(res => {

      // for display the correct number of cart items in navbar when the user logout and login after that with differnt email
       this._CartService.numberofCartItems.next(res.data.products.length)

      console.log('response of get all cart items from home',res.data.products);
      for (var i = 0; i < res.data.products.length; i++) {
        this.idOfProductInCart.push(res.data.products[i].product._id);
      }   
      console.log("  all id of products in cart items", this.idOfProductInCart)
      
    })



    // Type SUCCESS
    //this.toastEvokeService.success('success', 'Product added successfully to your cart').subscribe();
    // Type INFO
    //this.toastEvokeService.info('I am title!', 'I am a message!').subscribe();
    // Type WARNING
    //this.toastEvokeService.warning('I am title!', 'I am a message!').subscribe();
    // Type ERROR
    //this.toastEvokeService.danger('I am title!', 'I am a message!').subscribe();

  }

  RemoveSpecificCartItemBtn(pId: string) {
    this.isloading=pId;
    this._CartService.RemoveSpecificCartItemAPI(pId).subscribe(res => {
      // Type DANGER  jsut  style notifcation
      this.toastEvokeService.danger('success', 'item deleted Successfully').subscribe();
      console.log('deleted product item id', pId);
      
      for (var i = 0; i < this.idOfProductInCart.length; i++) {
        
        if (this.idOfProductInCart[i] == pId) {
          
          this.idOfProductInCart.splice(i, 1);
        }
        
      }
      
      console.log('yout ids of product you make it', this.idOfProductInCart)
      
      console.log('response of remove specific item from cart', res);
      this._CartService.numberofCartItems.next(res.numOfCartItems)
      
      this.isloading='no';
    })
  }


  addProductToCartBtn(productId: string) {
    this.isloading=productId;
    console.log('id of the product that added to cart', productId)
    this._CartService.addProductTocartAPI(productId).subscribe((res) => {

    
      console.log('user id from service',this._UserDataService.userId)
      this.idOfProductInCart.push(productId);
      console.log(this.idOfProductInCart)
      console.log('response of add to cart', res)
      this.toastEvokeService.success('success', 'Product added successfully to your cart').subscribe();
      this._CartService.numberofCartItems.next(res.numOfCartItems)
       this.isloading='no';


       console.log('userData && id  saved in auth',this._AuthenticatioService.userdata.getValue()._value.id)
    })
  }
  //heart icon (add)
  addProductToWishlistHeart(pId: string) {
   this.isloadingHeartAdd =pId;
   this.isloadingHeart='no'
    this._ProudctsService.addProductToWishlistAPi(pId).subscribe( res => { console.log(' Response  of add to wish cart ', res); this.wishesItems = res.data;
       this.isloadingHeartAdd== 'no'},
     )
  }
  //heart icon (remove)
  RemoveFromWishBtn(pId: string) {
     
    this.isloadingHeart=pId;
    this.isloadingHeartAdd='no'

    this._ProudctsService.removeFromWishlist(pId).subscribe(
       res => {
        console.log(res)
        this.wishesItems = res.data;
       this.isloadingHeart='no' ;
      },
    

    )

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true ,
    autoplayTimeout :2500,
    autoplaySpeed:1500,
    responsive: {
      0: {
        items: 1
      }

    },
    nav: true
  }

  categeriosSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }

    },
    nav: true
  }
  //pagintion of products
  pageChanged(event :any){
    this._ProudctsService.getAllProductsMethod(event).subscribe(res => {
      this.allproducts = res.data
      console.log(this.allproducts)
      console.log( 'response of get all products' , res)
      this.currentPageOfProducts = res.metadata.currentPage;   
      this.totalProducts = res.results      
      this.pageSizeProducts = res.metadata.limit
    });

  }



}
