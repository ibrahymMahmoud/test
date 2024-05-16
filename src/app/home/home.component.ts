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

export class HomeComponent  {


}
