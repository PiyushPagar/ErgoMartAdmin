import { MatDialogRef } from '@angular/material/dialog';
import { DashboardApiService } from './../../../_services/dashboard/dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-show-revenue-card',
  templateUrl: './show-revenue-card.component.html',
  styleUrls: ['./show-revenue-card.component.css']
})
export class ShowRevenueCardComponent implements OnInit {

  performanceData:any;

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
        this.performanceData= res;
        console.log(res);
       },
       error:(res)=>{
        console.log(res);
       }
      }
    )
  }

}
