import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTagInfoComponent } from './article-tag-info.component';

describe('ArticleTagInfoComponent', () => {
  let component: ArticleTagInfoComponent;
  let fixture: ComponentFixture<ArticleTagInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTagInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTagInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
