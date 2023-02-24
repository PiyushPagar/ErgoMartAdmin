import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalComponent } from 'src/app/GlobalVeriables/global-component';
import { ProductapiService } from 'src/app/_services/product/productapi.service';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { OrdersDetailsComponent } from '../orders-details/orders-details.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  sideBarOpen = true;
  displayedColumns: string[] = [
    'OrderId',
    'UserId',
    'UserName',
    'MobileNo',
    'City',
    'totalPrice',
    'orderStatus',
    'action',
    'detail'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private api: ProductapiService,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}
   searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      pagenum: ['0'],
      pagesize: ['100'],
      orderStatus: [''],
      price: [''],
      userId: [''],
      // userIdss: [''],
    });
    this.getAllOrders();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  getAllOrders() {
    const param = new HttpParams().set('pagenum',0).set('pagesize',40).set('orderStatus',this.searchForm.value.orderStatus).set('userId',this.searchForm.value.userId)
     .set('price',this.searchForm.value.price)
    return this.http
      .get<any>(
        GlobalComponent.appUrl + 'fetchOrderListfilter?',{params:param}
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(res.records);
          //console.log(this.searchForm.value);
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

  editOrder(row:any){
    this.dialog.open(EditOrderComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
        this.getAllOrders();
    })
  }


  orderDetails(row:any){
    this.dialog.open(OrdersDetailsComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
        this.getAllOrders();

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
