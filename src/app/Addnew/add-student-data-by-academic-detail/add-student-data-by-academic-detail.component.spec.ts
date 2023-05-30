import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentDataByAcademicDetailComponent } from './add-student-data-by-academic-detail.component';

describe('AddStudentDataByAcademicDetailComponent', () => {
  let component: AddStudentDataByAcademicDetailComponent;
  let fixture: ComponentFixture<AddStudentDataByAcademicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentDataByAcademicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentDataByAcademicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
