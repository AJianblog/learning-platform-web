import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCellComponent } from './event-cell.component';

describe('EventCellComponent', () => {
  let component: EventCellComponent;
  let fixture: ComponentFixture<EventCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
