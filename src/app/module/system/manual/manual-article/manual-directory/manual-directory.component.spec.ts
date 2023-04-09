import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDirectoryComponent } from './manual-directory.component';

describe('ManualDirectoryComponent', () => {
  let component: ManualDirectoryComponent;
  let fixture: ComponentFixture<ManualDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
