import { GlobalComponent } from './../../GlobalVeriables/global-component';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CategoryService } from './../../_services/Category/category.service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductapiService } from 'src/app/_services/product/productapi.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit  {
  // @ViewChild('fileInput') fileInput!: ElementRef;
  // @ViewChild('fileNameInput') fileNameInput!: ElementRef;
  imageUrl!: string;
  categoriesList:any[]=[];
  offersList:any[]=[];
  discountsList:any[]=[];
  imageFile!: File;
  productId!:BigInteger;
  showImageField=true;
  catagoryList = [
    'Fruits And Vegetable',
    'Dairy',
    'Chocolate And Snacks',
    'Home Essencials',
    'Pearsonal Care',
  ];

  productForm!: FormGroup;
  actionBtn : string="Save";
  dialogTitle:string="Add Product";
  constructor(
    private formBuilder: FormBuilder,
    private api: ProductapiService,
    private http:HttpClient,
    private categoryService: CategoryService,
    private dailogRef: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) {}

  ngOnInit(): void {
    this.getDropdownData();
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      productPrice: ['', Validators.required],
      imageUrl: [''],
      popularProduct: ['', Validators.required],
      subscribeProduct: ['', Validators.required],
      isVegeterian: ['', Validators.required],
      productStatus: ['', Validators.required],
      category: ['', Validators.required],
      discount: [''],
      offer: [''],
      weight: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    console.log(this.editData);
    if(this.editData){
     this.showImageField=false;
      this.dialogTitle="Update Product";
      this.actionBtn="Update"
      this.productId=this.editData.data.id;
      this.productForm.controls['productName'].setValue(this.editData.data.name);
      this.productForm.controls['productPrice'].setValue(this.editData.data.price);
      this.productForm.controls['description'].setValue(this.editData.data.desc);
      this.productForm.controls['imageUrl'].setValue(GlobalComponent.imageUrl + this.editData.data.imageUrl.toString());
      // this.imageUrl =GlobalComponent.imageUrl +this.editData.imageUrl;
      // this.fileInput.nativeElement.value = this.imageUrl;
      // console.log(this.fileInput.nativeElement.value);
      this.productForm.controls['popularProduct'].setValue(this.editData.data.ispopular.toString());
      this.productForm.controls['subscribeProduct'].setValue(this.editData.data.isSubscribe.toString());
      this.productForm.controls['isVegeterian'].setValue(this.editData.data.isVegan.toString());
      this.productForm.controls['productStatus'].setValue(this.editData.data.status);
      if(this.editData.data.category){
        this.productForm.controls['category'].setValue(this.editData.data.category.id);
      }
      if(this.editData.data.offer){
        this.productForm.controls['offer'].setValue(this.editData.data.offer.id);
      }
      if(this.editData.data.discount){
        this.productForm.controls['discount'].setValue(this.editData.data.discount.id);
      }
      this.productForm.controls['weight'].setValue(this.editData.data.weight);
      this.productForm.controls['quantity'].setValue(this.editData.data.inventory.quantity);
    }
  }

  // ngAfterViewInit() {
  //   // Get the image URL from the dialog data
  //   const imageUrl =GlobalComponent.imageUrl + this.editData.imageUrl;

  //   // Extract the file name from the image URL
  //   const fileName = imageUrl.split('/').pop();

  //   // Set the value of the file input field to the file name
  //   if (this.fileNameInput) {
  //     this.fileNameInput.nativeElement.value = fileName;
  //   }

  //   // Add an event listener to the file input element
  //   if (this.fileInput) {
  //     this.fileInput.nativeElement.addEventListener('change', () => {
  //       const files = this.fileInput.nativeElement.files;
  //       if (files.length > 0) {
  //         // Set the value of the file name input field to the selected file name
  //         this.fileNameInput.nativeElement.value = files[0].name;
  //       }
  //     });
  //   }
  // }

  addNewProduct() {
    const imageData = new FormData();
    imageData.append('image', this.imageFile);
    if(this.actionBtn=="Add Product"){
      if(this.productForm.valid){
        const param = new HttpParams()
        .set('name', this.productForm.value.productName)
        .set('desc', this.productForm.value.description)
        .set('price', this.productForm.value.productPrice)
        .set('categoryId', this.productForm.value.category)
        .set('discountId', this.productForm.value.discount)
        .set('offerId', this.productForm.value.offer)
        .set('status', this.productForm.value.productStatus)
        .set('quantity', this.productForm.value.quantity)
        .set('weight', this.productForm.value.weight)
        .set('isPopular', this.productForm.value.popularProduct)
        .set('isVegan', this.productForm.value.isVegeterian)
        .set('isSubscribe', this.productForm.value.subscribeProduct);
        // .set('image', imageData.toString());
       this.http
        .post<any>(
          GlobalComponent.appUrl + 'api/auth/addNewProduct',imageData,
          { params: param }
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            console.log(this.productForm.value);
            this.editData.parent.getAllProducts();
            alert("product Added Successfully");
          },
          error: () => {
            alert("product not added something went wrong");
            console.log('error');
          },
        });
      }else{
        Object.keys(this.productForm.controls).forEach(field => {
          const control = this.productForm.get(field);
          control!.markAsTouched({ onlySelf: true });
        });
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct() {
    const imageData = new FormData();
    imageData.append('image', this.imageFile);
    if(this.productForm.valid){
      const param = new HttpParams()
      .set('productId', this.productId.toString())
      .set('name', this.productForm.value.productName)
      .set('desc', this.productForm.value.description)
      .set('price', this.productForm.value.productPrice)
      .set('categoryId', this.productForm.value.category)
      .set('discountId', this.productForm.value.discount)
      .set('offerId', this.productForm.value.offer)
      .set('status', this.productForm.value.productStatus)
      .set('quantity', this.productForm.value.quantity)
      .set('weight', this.productForm.value.weight)
      .set('isPopular', this.productForm.value.popularProduct)
      .set('isVegan', this.productForm.value.isVegeterian)
      .set('isSubscribe', this.productForm.value.subscribeProduct);
      // .set('image', imageData.toString());
     this.http
      .put<any>(
        GlobalComponent.appUrl + 'api/auth/updateProduct',imageData,
        { params: param }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(this.productForm.value);
          this.editData.parent.getAllProducts();
          alert("product Updated Successfully");
        },
        error: () => {
          alert("product not Updating something went wrong");
          console.log('error');
        },
      });
    }else{
      Object.keys(this.productForm.controls).forEach(field => {
        const control = this.productForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
  }
  // addProduct() {
  //   console.log(this.productForm.value);
  //   if(!this.editData){
  //     if (this.productForm.valid) {
  //       this.api.postProduct(this.productForm.value).subscribe({
  //         next: (res) => {
  //           alert('Product Added Sucessfully'), console.log(res);
  //           this.productForm.reset();
  //           this.dailogRef.close('save');
  //         },
  //         error: () => {
  //           alert('Product is not added');
  //           console.log('error to add product');
  //         },
  //       });
  //     }
  //   }else{
  //     this.updateProduct();
  //   }
  // }

  // updateProduct(){
  //   this.api.putProduct(this.productForm.value,this.editData.id)
  //   .subscribe({
  //     next:(res)=>{
  //       alert("Product updated sucessful");
  //       console.log(res);
  //       this.productForm.reset;
  //       this.dailogRef.close('update');
  //     },
  //     error:()=>{
  //       alert("error")
  //     }
  //   })
  // }

  getDropdownData(){
    this.categoryService.getAllCategoriesOffersAndDiscounts().subscribe({
      next:(res)=>{
        this.categoriesList=res.categories;
        this.offersList=res.offers;
        this.discountsList=res.discounts;
      },error:(res)=>{
        console.log(res);
      }
    })
    }

    onFileChange(event:any) {
      this.imageFile = event.target.files[0];
    }
}
