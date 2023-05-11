import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationParameterComponent } from './add-application-parameter.component';

describe('AddApplicationParameterComponent', () => {
  let component: AddApplicationParameterComponent;
  let fixture: ComponentFixture<AddApplicationParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicationParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
