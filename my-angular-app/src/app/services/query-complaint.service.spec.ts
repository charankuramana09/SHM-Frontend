import { TestBed } from '@angular/core/testing';

import { QueryComplaintService } from './query-complaint.service';

describe('QueryComplaintService', () => {
  let service: QueryComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
