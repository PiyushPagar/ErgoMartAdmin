import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardGraphApiService } from 'src/app/_services/dashboard/graph.service';

@Component({
  selector: 'app-revenue-order-chart',
  templateUrl: './revenue-order-chart.component.html',
  styleUrls: ['./revenue-order-chart.component.css']
})
export class RevenueOrderChartComponent implements OnInit {


  public chartOptions={};
  public Highcharts: typeof Highcharts = Highcharts;
  public updateFlag = false;
  public value=100;


  constructor(
    private api:DashboardGraphApiService,
  ) { }

  ngOnInit(): void {

    this.api.getGraphDetails().subscribe((data: any) => {
      console.log(Object.values(data.lastMonthRevenue));
      this.chartOptions = {
        chart: {
          type: 'area'
        },
        title: {
          text: 'Revenue Orders Chart',
          align: 'left'
        },
        xAxis: {
          categories:Object.keys(data.lastMonthRevenue)
        },
        yAxis: {
          title: {
            text: 'Values'
          },

        },
        exprting:{
          enabled:true,
        },
        credits:{
          enabled:false,
        },
        series: [{
          type:"line",
          name: 'Revenue',
          data: Object.values(data.lastMonthRevenue)
        },
        {
          type:"line",
          name: 'Orders',
          data: Object.values(data.lastMonthOrders)
        }
      ]
      };
      this.updateFlag = true;
    });

    HC_exporting(Highcharts);

  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }

  }



