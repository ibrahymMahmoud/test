import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { BrandsComponent } from './brands/brands.component';
import { ContactComponent } from './contact/contact.component';
import { CategeriosComponent } from './categerios/categerios.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { PayComponent } from './pay/pay.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SubCategeryComponent } from './sub-categery/sub-categery.component';

const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:'full' },
  {path:"allorders", redirectTo:"orders",pathMatch:'full' },
  {path:"home", canActivate:[authGuard], component: HomeComponent /*,  children :[
    {path:'',component:},
    {path:'',component:}
  ]*/},
  {path:"login", component: LoginComponent },
  {path:"forgetPass", component:ForgetPasswordComponent },
  {path:"register", component: RegisterComponent },
  {path:"logout", canActivate:[authGuard] ,component: LogoutComponent },
  {path:"wishList", canActivate:[authGuard] ,component: WishListComponent },
  {path:"brands",canActivate:[authGuard], component: BrandsComponent },
  {path:"orders", canActivate:[authGuard],component:MyOrdersComponent },
  {path:"cart", canActivate:[authGuard],component:CartComponent },
  {path:"categerios",canActivate:[authGuard], component:CategeriosComponent },
  {path:"productDetails/:specificProductId",canActivate:[authGuard], component:ProductDetailsComponent },
  {path:"subCategery/:categeryId",canActivate:[authGuard], component:SubCategeryComponent },
  {path:"pay/:cartId",canActivate:[authGuard], component:PayComponent },
  {path:"**", component: NotfoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
