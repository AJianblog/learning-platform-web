import { TestBed } from '@angular/core/testing';

import { ArticleImplService } from './article-impl.service';

describe('ArticleImplService', () => {
  let service: ArticleImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
