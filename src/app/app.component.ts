import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isfalse:boolean=false
  title = 'app';
  constructor(private loadingScrean :NgxSpinnerService ,private _router:Router){
    this._router.events.subscribe(
      (e)=>{     
      //  this.loadingScrean.show()
        if(e instanceof NavigationStart){
          this.loadingScrean.show()
        }if( e instanceof NavigationEnd){
          //this.loadingScrean.hide()
        }


        
         setTimeout(() => {
            this.loadingScrean.hide()
         }, 1000);
      
      }
    )

  }
}
