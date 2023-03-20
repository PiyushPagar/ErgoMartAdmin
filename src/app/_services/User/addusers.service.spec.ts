import { AddUserService } from './addusers.service';
import { TestBed } from '@angular/core/testing';



describe('AddUserService', () => {
  let service: AddUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
