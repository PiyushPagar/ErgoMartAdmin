import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueOrderChartComponent } from './revenue-order-chart.component';

describe('RevenueOrderChartComponent', () => {
  let component: RevenueOrderChartComponent;
  let fixture: ComponentFixture<RevenueOrderChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueOrderChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueOrderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
