import { MatDialog } from '@angular/material/dialog';
import { DashboardApiService } from './../../_services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { ShowRevenueCardComponent } from '../dashboard/show-revenue-card/show-revenue-card.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sideBarOpen = true;
  revenue:any;
  adr:any;
  orders:any;
  constructor(
    private dialog: MatDialog,
    private api:DashboardApiService,
  ) { }

  ngOnInit(): void {
    this.getCardDetails();
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  openDialog() {
    this.dialog
      .open(ShowRevenueCardComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        // if (val === 'save') {
        //   this.getAllProducts();
        // }
      });
  }

  getCardDetails(){
    this.api.getRevenueAdrAndOrders().subscribe(
      {
       next:(res)=>{
        console.log(res);
        this.revenue=res.todaysPerformance.revenue.toFixed(2);
        this.adr=res.todaysPerformance.adr.toFixed(2);
        this.orders=res.todaysPerformance.orders;

       },
       error:(res)=>{
        console.log(res);
       }
      }
    )
  }
}
