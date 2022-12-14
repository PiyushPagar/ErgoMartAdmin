import { TestBed } from '@angular/core/testing';

import { FileUpoadService } from './file-upoad.service';

describe('FileUpoadService', () => {
  let service: FileUpoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUpoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
