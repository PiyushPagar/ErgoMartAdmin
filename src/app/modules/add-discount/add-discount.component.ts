import { DiscountService } from './../../_services/Discount/discount.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  addDiscount={
    name: "",
    description: "",
    discount_percent: "",
    status: ""
  }

  discountForm!:FormGroup;

  constructor(
    private discountService:DiscountService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.discountForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      discount_percent: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addNewDiscount(){
    if(this.discountForm.valid){
      this.discountService.addNewDiscountService(this.addDiscount).subscribe({
        next:(res)=>{
          this.discountForm.reset();
          alert('Discount Added Sucessfully'),
          console.log(res);
        },
        error:(res)=>{
          alert('Something went Wrong Discount not Added'), console.log(res);
          console.log(res);
        }
      });
    }
}

}
