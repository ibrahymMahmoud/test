import { Pipe, PipeTransform } from '@angular/core';

interface productInterface {

  brand?: any;
  category?: any;
  createdAt?: any;
  description?: string;
  id?: string;
  imageCover?: string;
  images?:any;
  price?:any;
  quantity?:any;
  ratingsAverage?:any;
  ratingsQuantity?:any;
  slug?:string;
  sold?:any;
  subcategory?:any;
  title?:string;
  updatedAt?:string;
  _id ?: any;
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allproducts: productInterface[], searchValue: string): productInterface[] {
    return allproducts?.filter((product => product.title?.toLocaleLowerCase().includes(searchValue.toLowerCase())));
  }

}
