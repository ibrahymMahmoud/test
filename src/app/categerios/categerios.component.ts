import { Component, OnInit } from '@angular/core';
import { CategeriosService } from '../categerios.service';

@Component({
  selector: 'app-categerios',
  templateUrl: './categerios.component.html',
  styleUrls: ['./categerios.component.css']
})
export class CategeriosComponent implements OnInit {

  allCategerios:any ;

  constructor(private _CategeriosService:CategeriosService){}

  ngOnInit(): void {
    localStorage.setItem('currentPage',"/categerios")
    this._CategeriosService.getAllCategories().subscribe(res=>{this.allCategerios=res.data;console.log('response of get all categerious',res)})
  }

  getSpecificCategory(pId:string ){
    // this._CategeriosService.getSpecificCategory().subscribe(res=>console.log(res))

    console.log("the categery id is :",pId)
     
  }

}
