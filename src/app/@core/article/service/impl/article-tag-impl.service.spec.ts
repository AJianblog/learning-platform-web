import { TestBed } from '@angular/core/testing';

import { ArticleTagImplService } from './article-tag-impl.service';

describe('ArticleTagImplService', () => {
  let service: ArticleTagImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleTagImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
