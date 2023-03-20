import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {

  constructor(private http:HttpClient) { }


  getAllProducts(param :any){
    return this.http.get<any>(GlobalComponent.appUrl + 'api/auth/fetchlistofproductbyfilter',
    { params: param });
  }

  postProduct(data :any){
    return this.http.post<any>(GlobalComponent.appUrl+"api/auth/addNewProduct",data);
  }

  putProduct(data :any,id:number){
    return this.http.put<any>(GlobalComponent.appUrl+"updateProduct/"+id,data);
  }

  deleteProduct(id:number){
    return this.http.delete<any>(GlobalComponent.appUrl+"deleteProduct/"+id);
  }

}
