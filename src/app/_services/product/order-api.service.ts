import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http:HttpClient) { }

  postorder(data :any){
    return this.http.post<any>(GlobalComponent.appUrl+"setOrderDeliveryStatus",data);
  }

  getOrderDetails(id:number){
    return this.http.get<any>(GlobalComponent.appUrl+"getOrderDetailsbyid/"+id);
  }





}
