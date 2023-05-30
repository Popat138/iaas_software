import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentByCollegeComponent } from './select-student-by-college.component';

describe('SelectStudentByCollegeComponent', () => {
  let component: SelectStudentByCollegeComponent;
  let fixture: ComponentFixture<SelectStudentByCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStudentByCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentByCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
