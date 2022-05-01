import { TestBed } from '@angular/core/testing';

import { ArticleTypeImplService } from './article-type-impl.service';

describe('ArticleTypeImplService', () => {
  let service: ArticleTypeImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleTypeImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
