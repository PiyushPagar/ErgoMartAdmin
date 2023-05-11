import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApplicationParameterService {

  constructor(private http:HttpClient) { }


  addApplicationParameter(data:any){
    return this.http.post<any>(GlobalComponent.appUrl+"api/auth/addParameters",data);
  }

  updateApplicationParameter(data:any,id:any){
    return this.http.put<any>(GlobalComponent.appUrl+"api/auth/updateParameter/"+id,data);
  }
  deleteApplicationParameter(id:any){
    return this.http.delete<any>(GlobalComponent.appUrl+"api/auth/deleteParameter/"+id);
  }

}
