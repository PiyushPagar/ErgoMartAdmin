import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardGraphApiService {

  constructor(private http:HttpClient) { }


  getGraphDetails(){
    return this.http.get<any>(GlobalComponent.appUrl+"api/auth/getGraphPerformance");
  }

}
