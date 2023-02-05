import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualModifyComponent } from './manual-modify.component';

describe('ManualModifyComponent', () => {
  let component: ManualModifyComponent;
  let fixture: ComponentFixture<ManualModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
