import { Injectable } from '@angular/core';
import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http:HttpClient) { }

  addNewOfferService(data:any,param:any){
     return this.http.post<any>(GlobalComponent.appUrl+"api/auth/addoffer",data,{params:param});
  }

}
