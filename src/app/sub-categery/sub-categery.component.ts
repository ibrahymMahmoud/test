import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategeriosService } from '../categerios.service';


@Component({
  selector: 'app-sub-categery',
  templateUrl: './sub-categery.component.html',
  styleUrls: ['./sub-categery.component.css']
})
export class SubCategeryComponent implements OnInit {
  subCategeryOfCategery:any;
  specificCategeryId:string='';
  allSubcategerios:any ;
  nameOfspaseficCtegery :string='';
  lodaing:boolean =false;

  constructor(private _CategeriosService:CategeriosService ,  private _ActivatedRoute:ActivatedRoute ){}
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(id=>this.specificCategeryId= id['categeryId'])

    this._CategeriosService.getAllSubCategoriesOnCategory(this.specificCategeryId).subscribe(
      res=>{console.log('response of  get specific sub categery on categery ', res)
              
            this.subCategeryOfCategery = res.data;
    }
      )

      this._CategeriosService.getSpecificCategory(this.specificCategeryId).subscribe(
        {
          next:res=>console.log('response of get spesific categery', res),
          error : err=>console.log(err)
        }
      )
  }


  getAllSubCategerys(){
     this.lodaing=true;

    this._CategeriosService.getAllSubCategories().subscribe(res=> {this.allSubcategerios = res.data ;console.log('response of get all subcategerys ',res.data ) ; this.lodaing=false;})
  }

  getspecificSubCategory(categeryId:string){
    this.nameOfspaseficCtegery='';
    this._CategeriosService.getspecificSubCategory(categeryId).subscribe(res=>{console.log('response of  get specific sub categery ', res),this.nameOfspaseficCtegery = res.data.name})

  }

  getAllSubCategoriesOnCategory(categeryId:string){
   
    this._CategeriosService.getAllSubCategoriesOnCategory(categeryId).subscribe(
      res=>{console.log('response of  get specific sub categery on categery ', res)
             
            this.subCategeryOfCategery = res.data;
    }
      )
  }

  getSpecificCategory(id=this.specificCategeryId){
    this._CategeriosService.getSpecificCategory(id).subscribe(
      {
        next:res=>console.log('response of get spesific categery', res),
        error : err=>console.log(err)
      }
    )

  }

  

}
