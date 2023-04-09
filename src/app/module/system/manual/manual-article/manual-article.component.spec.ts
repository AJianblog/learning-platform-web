import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualArticleComponent } from './manual-article.component';

describe('ManualArticleComponent', () => {
  let component: ManualArticleComponent;
  let fixture: ComponentFixture<ManualArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
