import { TestBed } from '@angular/core/testing';

import { ManualImplService } from './manual-impl.service';

describe('ManualImplService', () => {
  let service: ManualImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
