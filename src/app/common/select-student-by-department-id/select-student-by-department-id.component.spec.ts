import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentByDepartmentIdComponent } from './select-student-by-department-id.component';

describe('SelectStudentByDepartmentIdComponent', () => {
  let component: SelectStudentByDepartmentIdComponent;
  let fixture: ComponentFixture<SelectStudentByDepartmentIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStudentByDepartmentIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentByDepartmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
