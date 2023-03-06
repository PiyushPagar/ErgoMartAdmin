import { TestBed } from '@angular/core/testing';
import { DashboardGraphApiService } from './graph.service';


describe('DashboardGraphApiService', () => {
  let service: DashboardGraphApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardGraphApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
