import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTeacherByCollegeComponent } from './select-teacher-by-college.component';

describe('SelectTeacherByCollegeComponent', () => {
  let component: SelectTeacherByCollegeComponent;
  let fixture: ComponentFixture<SelectTeacherByCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTeacherByCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTeacherByCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
