import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourseByProgramIdComponent } from './select-course-by-program-id.component';

describe('SelectCourseByProgramIdComponent', () => {
  let component: SelectCourseByProgramIdComponent;
  let fixture: ComponentFixture<SelectCourseByProgramIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCourseByProgramIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCourseByProgramIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
