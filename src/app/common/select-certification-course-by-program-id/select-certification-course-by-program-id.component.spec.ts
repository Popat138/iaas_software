import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCertificationCourseByProgramIdComponent } from './select-certification-course-by-program-id.component';

describe('SelectCertificationCourseByProgramIdComponent', () => {
  let component: SelectCertificationCourseByProgramIdComponent;
  let fixture: ComponentFixture<SelectCertificationCourseByProgramIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCertificationCourseByProgramIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCertificationCourseByProgramIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
