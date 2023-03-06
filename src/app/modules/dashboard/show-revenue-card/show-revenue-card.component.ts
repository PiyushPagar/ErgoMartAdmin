import { MatDialogRef } from '@angular/material/dialog';
import { DashboardApiService } from './../../../_services/dashboard/dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-show-revenue-card',
  templateUrl: './show-revenue-card.component.html',
  styleUrls: ['./show-revenue-card.component.css']
})
export class ShowRevenueCardComponent implements OnInit {

  todaysrevenue:any;
  todaysadr:any;
  todaysorders:any;
  monthsRevenue:any;
  monthsadr:any;
  monthsorders:any;

  constructor(
    private api:DashboardApiService,
    private dailogRef: MatDialogRef<ShowRevenueCardComponent>
  ) { }

  ngOnInit(): void {
    this.getCardDetails();
  }

  getCardDetails(){
    this.api.getRevenueAdrAndOrders().subscribe(
      {
       next:(res)=>{
        console.log(res);
        this.todaysrevenue=res.todaysPerformance.revenue.toFixed(2);
        this.todaysadr=res.todaysPerformance.adr.toFixed(2);
        this.todaysorders=res.todaysPerformance.orders;
        this.monthsRevenue=res.monthlyPerformance.revenue.toFixed(2);
        this.monthsadr=res.monthlyPerformance.adr.toFixed(2);
        this.monthsorders=res.monthlyPerformance.orders;

       },
       error:(res)=>{
        console.log(res);
       }
      }
    )
  }

}
