import { TestBed } from '@angular/core/testing';

import { FeeCalculationService } from './fee-calculation.service';

describe('FeeCalculationService', () => {
  let service: FeeCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
