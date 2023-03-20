import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http:HttpClient) { }


  addNewUser(data :any,headers:any){
    return this.http.post<any>(GlobalComponent.appUrl+"signupAdmin",data,{'headers':headers});
  }

}
