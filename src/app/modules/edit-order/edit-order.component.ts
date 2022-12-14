import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderApiService } from 'src/app/_services/product/order-api.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  orderForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: OrderApiService,
    private dailogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) { }

  ngOnInit(): void {

    this.orderForm = this.formBuilder.group({
      orderId:[''],
      orderStatus: ['']
    })
    this.orderForm.controls['orderId'].setValue(this.editData.orderId);
    this.orderForm.controls['orderStatus'].setValue(this.editData.orderStatus);
  }


  updateOrder(){
    this.api.postorder(this.orderForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product updated sucessful");
        console.log(res);
        console.log(this.orderForm.value);
        this.orderForm.reset;
        this.dailogRef.close('update');
      },
      error:()=>{
        console.log(this.orderForm.value);
        alert("error");
      }
    })
  }

}
