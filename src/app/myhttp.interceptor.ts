import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';


@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor(private loadingScrean :NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 if(localStorage.getItem('userToken') !=null){ 
    const userToken :any = {token : localStorage.getItem('userToken')}
  //  this.loadingScrean.show()

   request = request.clone( { setHeaders : userToken  })
}

    return next.handle(request).pipe(finalize(()=>this.loadingScrean.hide()));
  }
}
