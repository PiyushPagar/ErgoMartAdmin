import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(private http:HttpClient) { }


  getRevenueAdrAndOrders(){
    return this.http.get<any>(GlobalComponent.appUrl+"api/auth/getReveneueAdrAndOrders");
  }

}
