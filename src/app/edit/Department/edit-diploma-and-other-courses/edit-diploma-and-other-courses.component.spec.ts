import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiplomaAndOtherCoursesComponent } from './edit-diploma-and-other-courses.component';

describe('EditDiplomaAndOtherCoursesComponent', () => {
  let component: EditDiplomaAndOtherCoursesComponent;
  let fixture: ComponentFixture<EditDiplomaAndOtherCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiplomaAndOtherCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiplomaAndOtherCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
