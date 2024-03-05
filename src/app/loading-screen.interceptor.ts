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
export class LoadingScreenInterceptor implements HttpInterceptor {

  constructor(private loadingScrean :NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //this.loadingScrean.show()
    return next.handle(request).pipe(finalize(()=>this.loadingScrean.hide()));
  }
}
