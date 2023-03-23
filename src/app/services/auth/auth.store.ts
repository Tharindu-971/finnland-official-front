import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../models/user.model";
import { JwtHelperService } from "@auth0/angular-jwt";




const AUTH_DATA= 'auth_data';

@Injectable({
    providedIn:'root'
})
export class AuthStore{

    private subject = new BehaviorSubject<User>(null);

    user$:Observable<User> = this.subject.asObservable();
    isLoggedIn$:Observable<boolean>;
    isLoggedOut$:Observable<boolean>;

    constructor(private http:HttpClient,private helper:JwtHelperService){

        this.isLoggedIn$ = this.user$.pipe(map(user=>!!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn=>!isLoggedIn));

        const user =localStorage.getItem(AUTH_DATA);

        if(user){
            console.log("gggg",user)
            this.subject.next(JSON.parse(user))
        }
    }

    valideToken():boolean{
        const user =JSON.parse(localStorage.getItem(AUTH_DATA));
        if(user){
            return this.helper.isTokenExpired();
        }
        return false;
    }

    getRoles():string[]{
        const user =JSON.parse(localStorage.getItem(AUTH_DATA));
        if(user){
            return user.roles;
        }
        return [];
    }

    login(email:string,password:string):Observable<any>{
        return this.http.post<any>(`${environment.apiUrl}/auth/login`,{email,password})
        .pipe(
            tap(res=>{
                this.subject.next(res.body)
                localStorage.setItem(AUTH_DATA,JSON.stringify(res.body))    
            }),
            shareReplay()
            );

            
    }

    logout(){
        this.subject.next(null);
        localStorage.removeItem(AUTH_DATA);
    }
}