import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSchemaComponent } from './component-schema.component';

describe('ComponentSchemaComponent', () => {
  let component: ComponentSchemaComponent;
  let fixture: ComponentFixture<ComponentSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
