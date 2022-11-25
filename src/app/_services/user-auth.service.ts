import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {  }
  
    public setRoles(roles :string) {
      localStorage.setItem("roles",roles);
   }

   public getRoles(){
    localStorage.getItem("roles");
   }


   public setToken(jwtToken: string){
    localStorage.setItem("jwtToken", jwtToken);
   }

   public getToken(): string | null{
    return localStorage.getItem("jwtToken");
   }

   public clear(){
    localStorage.clear;
   }

   public isLoggedIn(){
    return this.getRoles() ;
   }

}


