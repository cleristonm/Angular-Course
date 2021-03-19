import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService : AuthService,
      private router: Router){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map( user => {
        const isAuth = !!user;
        if (isAuth){
          return true
        }
        return this.router.createUrlTree(['/auth']);      
    }),
    // tap(isAuth => {
    //   if (!isAuth){
    //     this.router.navigate(['/auth']);
    //   }
    // })
    );
  }
  
}
