import { TestBed } from '@angular/core/testing';

import { ManualDirectoryImplService } from './manual-directory-impl.service';

describe('ManualMenuImplService', () => {
  let service: ManualDirectoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualDirectoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
