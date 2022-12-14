import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrderApiService } from 'src/app/_services/product/order-api.service';
import { ProductapiService } from 'src/app/_services/product/productapi.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit  {

  displayedColumns: string[] = [
    'name',
    'quantity',
    'price'
  ];
  dataSource!: MatTableDataSource<any>;
  public responseData: any;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private api: OrderApiService,
    private dailogRef: MatDialogRef<OrdersDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) { }

  ngOnInit(): void {
    this.getOrderDetail(this.editData.orderId);
  }


  getOrderDetail(id:number){
      this.api.getOrderDetails(id)
      .subscribe({
        next:(res)=>{
          // alert("Product Deleted sucessfully");
          console.log(res);
          this.dataSource = new MatTableDataSource(res.orderItem);
           
           this.responseData = res;
           this.responseData = Array.of(this.responseData); 
           console.log(this.responseData);
        },
        error:()=>{
          alert("error")
        }
      })
  }

}
