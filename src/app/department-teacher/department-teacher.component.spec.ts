import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTeacherComponent } from './department-teacher.component';

describe('DepartmentTeacherComponent', () => {
  let component: DepartmentTeacherComponent;
  let fixture: ComponentFixture<DepartmentTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
