import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentDataByAcademicDetailComponent } from './edit-student-data-by-academic-detail.component';

describe('EditStudentDataByAcademicDetailComponent', () => {
  let component: EditStudentDataByAcademicDetailComponent;
  let fixture: ComponentFixture<EditStudentDataByAcademicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentDataByAcademicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentDataByAcademicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
