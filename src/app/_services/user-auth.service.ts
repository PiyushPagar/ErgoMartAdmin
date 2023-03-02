import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../GlobalVeriables/global-component';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http :HttpClient) {  }
  
  doLogin(credentials:any){
    return this.http.post(`${GlobalComponent.appUrl}api/auth/signin`,credentials)
  } 

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

   isLoggedIn()
   {
     var token = this.getToken();
     if(token==undefined || token== '' || token==null)
     {
       return false;
     }else{
       return true;
     }
   }
 
   logout(){
     localStorage.clear();
     return true;
   }

}


