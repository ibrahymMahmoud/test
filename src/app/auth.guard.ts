import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticatioService } from './authenticatio.service'; 
export const authGuard: CanActivateFn = (route, state) => {

    let _Router : Router = inject(Router);
    let _AuthenticatioService : AuthenticatioService = inject(AuthenticatioService);
   if (localStorage.getItem("userToken") == null ){
     _Router.navigate(['/login'])
    return false
   }else{
     _AuthenticatioService.saveUserdDataService()
    return true
   }
};

