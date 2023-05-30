import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEventLayoutComponent } from './department-event-layout.component';

describe('DepartmentEventLayoutComponent', () => {
  let component: DepartmentEventLayoutComponent;
  let fixture: ComponentFixture<DepartmentEventLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentEventLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEventLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
