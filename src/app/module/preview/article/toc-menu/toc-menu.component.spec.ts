import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TocMenuComponent } from './toc-menu.component';

describe('TocMenuComponent', () => {
  let component: TocMenuComponent;
  let fixture: ComponentFixture<TocMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TocMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TocMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
