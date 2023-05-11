import { TestBed } from '@angular/core/testing';
import { ApplicationParameterService } from './applicationparameter.service';
describe('ApplicationParameterService', () => {
  let service: ApplicationParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
