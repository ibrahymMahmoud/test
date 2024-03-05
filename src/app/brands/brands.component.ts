import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent  implements OnInit {

  allBrands:any ;
  spseficPrand:any;
  islodaing:boolean=false;

  constructor(private _BrandsService:BrandsService){}

  ngOnInit(): void {
    localStorage.setItem('currentPage',"/brands")
    this._BrandsService.GetAllBrands().subscribe(res=>{console.log(res.data);this.allBrands=res.data})
    
  }

 getOnePrand(brandId:string){
  this.islodaing=true;

  this._BrandsService.getSpecificBrand(brandId).subscribe(
    res=>{console.log(res.data);
      this.islodaing=false;
       
         this.spseficPrand =res.data;
            
    }
  )
}
}
