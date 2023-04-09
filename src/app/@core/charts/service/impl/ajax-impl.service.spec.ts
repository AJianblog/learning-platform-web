import { TestBed } from '@angular/core/testing';

import { AjaxImplService } from './ajax-impl.service';

describe('AjaxImplService', () => {
  let service: AjaxImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
