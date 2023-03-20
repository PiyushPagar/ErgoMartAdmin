import { Injectable } from '@angular/core';
import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  getAllCategories(){
    return this.http.get<any>(GlobalComponent.appUrl+"api/auth/category");
  }

  getAllCategoriesOffersAndDiscounts(){
    return this.http.get<any>(GlobalComponent.appUrl+"getAllCategoryOfferDiscounts");
  }

  addNewCategoryService(data:any){
     return this.http.post<any>(GlobalComponent.appUrl+"api/auth/addcategory",data);
  }

}
