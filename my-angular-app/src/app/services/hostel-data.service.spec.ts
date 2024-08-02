import { TestBed } from '@angular/core/testing';

import { HostelDataService } from './hostel-data.service';

describe('HostelDataService', () => {
  let service: HostelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
