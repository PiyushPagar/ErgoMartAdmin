import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {

  constructor(private http:HttpClient) { }


  postProduct(data :any){
    return this.http.post<any>("http://localhost:8082/addProduct/",data);
  }
  getProduct(){
  
  }
}
