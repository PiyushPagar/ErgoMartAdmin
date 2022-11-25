import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductapiService } from 'src/app/_services/product/productapi.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private formBuilder: FormBuilder,
    private api: ProductapiService,
    private dailogRef: MatDialogRef<AddproductComponent>
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
  }

  addProduct() {
    console.log(this.productForm.value);
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
  }
}
