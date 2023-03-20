import { AddOfferComponent } from './../add-offer/add-offer.component';
import { AddDiscountComponent } from './../add-discount/add-discount.component';
import { AddCategoryComponent } from './../add-category/add-category.component';
import { CategoryService } from './../../_services/Category/category.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { ProductapiService } from 'src/app/_services/product/productapi.service';
import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  sideBarOpen = true;
  categoryOptions:any[]=[];
  displayedColumns: string[] = [
    'name',
    'imageUrl',
    'ispopular',
    'price',
    'category',
    'status',
    'quantity',
    'action',
    'image',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ProductapiService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  searchForm!: FormGroup;
  ngOnInit(): void {
    this.getCategoryforDropdown();
    this.searchForm = this.formBuilder.group({
      searchName: [''],
      searchPrice: [''],
      isPopular: [''],
      category: [''],
      searchStatus: ['active'],
      price: [''],
    });
    this.getAllProducts();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openDialog() {
    this.dialog
      .open(AddproductComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  getAllProducts() {
    const param = new HttpParams()
      .set('pagenum', 0)
      .set('pagesize', GlobalComponent.totalPage)
      .set('status', this.searchForm.value.searchStatus)
      .set('categoryId', this.searchForm.value.category)
      .set('productname', this.searchForm.value.searchName)
      .set('price', this.searchForm.value.price)
      .set('ispopular', this.searchForm.value.isPopular);
    return this.api.getAllProducts(param)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(this.searchForm.value);
          this.dataSource = new MatTableDataSource(res.records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          //alert("error");
          console.log('error');
        },
      });
  }
  editProduct(row: any) {
    this.dialog
      .open(AddproductComponent, {
        width: '30%',
        data: { parent: this,data:row},
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProducts();
        }
      });
  }

  viewImage(row: any) {
    this.dialog
      .open(ViewImageComponent, {
        width: '40%',
        data: { parent: this,data:row},
      })
      .afterClosed()
      .subscribe((val) => {
        // if(val=== 'update')
        // {
        //   this.getAllProducts();
        // }
      });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Product Deleted sucessfully');
        console.log(res);
        this.getAllProducts();
      },
      error: () => {
        alert('error');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCategoryforDropdown(){
  this.categoryService.getAllCategories().subscribe({
    next:(res)=>{
      this.categoryOptions=res;
      console.log(this.categoryOptions);
    },error:(res)=>{
      console.log(res);
    }
  });
  }

  addCategory(){
    this.dialog
      .open(AddCategoryComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });

  }
  addDiscount(){
    this.dialog
      .open(AddDiscountComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }
  addOffer(){
    this.dialog
      .open(AddOfferComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }
}
