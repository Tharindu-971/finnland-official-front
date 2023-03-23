import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthStore } from '../services/auth/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private authStore:AuthStore,private toastr:ToastrService){}
  canActivate(){
    const loggedin = this.authStore.isLoggedIn$.subscribe();
    console.log(this.authStore.valideToken(),"hhh")
    if(this.authStore.valideToken()){
      console.log("authguar")
      return true;
    }
    
    this.toastr.warning("Invalid token please Login again!")
    this.router.navigate(['/login'])
    return false;
  }
  
}
