import { Component,ViewChild, AfterViewInit,OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductapiService } from 'src/app/_services/product/productapi.service';
import { AddproductComponent } from '../addproduct/addproduct.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup ,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})


export class InventoryComponent implements OnInit {
  sideBarOpen = true;
  displayedColumns: string[] = ['name', 'imageUrl', 'ispopular', 'price','status','quantity'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog: MatDialog,private http:HttpClient,private formBuilder:FormBuilder) { }


  searchForm!: FormGroup;
  ngOnInit(): void {
  
    this.searchForm = this.formBuilder.group({
      searchName: [''],
      searchPrice: [''],
      isPopular: [''],
      searchProduct: [''],
      searchStatus: [''],
      minPrice: [''],
      maxPrice: [''],
    });
    this.getAllProducts(this.searchForm);
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
  openDialog() {
    this.dialog.open(AddproductComponent, {
    width:'30%'
    });
  }

  getAllProducts(searchForm:any){
    const param = new HttpParams().
    set('pagenum',0).set('pagesize',15)
    // set('status',searchForm.value.productStatus).set('productname',searchForm.value.searchName)
    // .set('maxprice',searchForm.value.maxPrice).set('maxprice',searchForm.value.minPrice).set('ispopular',searchForm.value.isPopular)
    return this.http.get<any>("http://localhost:8082/api/auth/fetchlistofproductbyfilter",{params:param}).subscribe({
      next:(res)=>{
        console.log(res);
        console.log(searchForm.value);
        this.dataSource=new MatTableDataSource(res.records);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:()=>{
        alert("error");
        console.log("error");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
