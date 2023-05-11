import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationParameterComponent } from './application-parameter.component';

describe('ApplicationParameterComponent', () => {
  let component: ApplicationParameterComponent;
  let fixture: ComponentFixture<ApplicationParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
