import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../GlobalVeriables/global-component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient:HttpClient) {

   }
   public login(loginData: any){
       return this.httpclient.post(GlobalComponent.appUrl+'signin',loginData)
   }
}
