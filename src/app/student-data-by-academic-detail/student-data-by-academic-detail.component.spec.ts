import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDataByAcademicDetailComponent } from './student-data-by-academic-detail.component';

describe('StudentDataByAcademicDetailComponent', () => {
  let component: StudentDataByAcademicDetailComponent;
  let fixture: ComponentFixture<StudentDataByAcademicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDataByAcademicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDataByAcademicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
