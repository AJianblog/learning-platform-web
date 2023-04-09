import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyManualDirectoryComponent } from './modify-manual-directory.component';

describe('ModifyManualDirectoryComponent', () => {
  let component: ModifyManualDirectoryComponent;
  let fixture: ComponentFixture<ModifyManualDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyManualDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyManualDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
