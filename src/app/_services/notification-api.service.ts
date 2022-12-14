import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../GlobalVeriables/global-component';

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {

  constructor(private http:HttpClient) { }


  postNotification(data :any){
    return this.http.post<any>(GlobalComponent.appUrl+"api/auth/addNotification",data);
  }


  putNotification(data :any,id:number){
    return this.http.put<any>(GlobalComponent.appUrl+"api/auth/updateNotification/"+id,data);
  }

}
