import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './contact/contact.component';
import { CategeriosComponent } from './categerios/categerios.component';
import { BrandsComponent } from './brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ROUTES, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

CUSTOM_ELEMENTS_SCHEMA
// Import from library
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { CartComponent } from './cart/cart.component';
import { PayComponent } from './pay/pay.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingScreenInterceptor } from './loading-screen.interceptor';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SubCategeryComponent } from './sub-categery/sub-categery.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    NotfoundComponent,
    ContactComponent,
    CategeriosComponent,
    BrandsComponent,
    ProductDetailsComponent,
    SearchPipe,
    CartComponent,
    PayComponent,
    WishListComponent,
    ForgetPasswordComponent,
    MyOrdersComponent,
    SubCategeryComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    CarouselModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    


  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],



  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
