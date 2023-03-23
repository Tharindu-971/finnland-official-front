import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../services/auth/auth.store';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authStore:AuthStore,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(route, url);
  }
  
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authStore.valideToken()) {
      const userRoles = this.authStore.getRoles();
      
      const arr = route.data['role'].filter(r=>userRoles.some(x=>x===r))

      if (route.data['role'] && !(arr.length>0) ) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
