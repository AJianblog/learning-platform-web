import { TestBed } from '@angular/core/testing';

import { ChartsImplService } from './charts-impl.service';

describe('ChartsImplService', () => {
  let service: ChartsImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
