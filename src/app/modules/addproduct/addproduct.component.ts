import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductapiService } from 'src/app/_services/product/productapi.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  catagoryList = [
    'Fruits And Vegetable',
    'Dairy',
    'Chocolate And Snacks',
    'Home Essencials',
    'Pearsonal Care',
  ];
  //cheak redio button
  
  productForm!: FormGroup;
  actionBtn : string="Save"
  constructor(
    private formBuilder: FormBuilder,
    private api: ProductapiService,
    private dailogRef: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      imageUrl: ['', Validators.required],
      popularProduct: ['', Validators.required],
      productStatus: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    console.log(this.editData);
    if(this.editData){
      this.actionBtn="Update"
      this.productForm.controls['productName'].setValue(this.editData.name);
      this.productForm.controls['productPrice'].setValue(this.editData.price);
      this.productForm.controls['imageUrl'].setValue(this.editData.imageUrl);
      this.productForm.controls['popularProduct'].setValue(this.editData.ispopular);
      this.productForm.controls['productStatus'].setValue(this.editData.status);
      this.productForm.controls['category'].setValue(this.editData.category.title);
      this.productForm.controls['quantity'].setValue(this.editData.inventory.quantity);
    }
  }

  addProduct() {
    console.log(this.productForm.value);
    if(!this.editData){
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product Added Sucessfully'), console.log(res);
            this.productForm.reset();
            this.dailogRef.close('save');
          },
          error: () => {
            alert('Product is not added');
            console.log('error to add product');
          },
        });
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated sucessful");
        console.log(res);
        this.productForm.reset;
        this.dailogRef.close('update');
      },
      error:()=>{
        alert("error")
      }
    })
  }
}
