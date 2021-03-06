import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTagComponent } from './article-tag.component';

describe('TagTypeComponent', () => {
  let component: ArticleTagComponent;
  let fixture: ComponentFixture<ArticleTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
