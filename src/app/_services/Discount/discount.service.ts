import { Injectable } from '@angular/core';
import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http:HttpClient) { }

  addNewDiscountService(data:any){
     return this.http.post<any>(GlobalComponent.appUrl+"addDiscount",data);
  }

}
