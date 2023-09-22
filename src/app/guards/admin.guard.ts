// import { CanActivateFn } from '@angular/router';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{


  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
    if(this.authService.isAdmin()) return true
    else {
      this.authService.clear()
      return this.router.createUrlTree(['/unauthorized'])
    } 
  }



}