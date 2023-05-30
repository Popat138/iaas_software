import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPgCoursesComponent } from './edit-pg-courses.component';

describe('EditPgCoursesComponent', () => {
  let component: EditPgCoursesComponent;
  let fixture: ComponentFixture<EditPgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
