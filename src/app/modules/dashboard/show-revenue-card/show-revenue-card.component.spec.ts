import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRevenueCardComponent } from './show-revenue-card.component';

describe('ShowRevenueCardComponent', () => {
  let component: ShowRevenueCardComponent;
  let fixture: ComponentFixture<ShowRevenueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRevenueCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRevenueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
