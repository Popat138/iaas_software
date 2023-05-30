import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUgCoursesComponent } from './edit-ug-courses.component';

describe('EditUgCoursesComponent', () => {
  let component: EditUgCoursesComponent;
  let fixture: ComponentFixture<EditUgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
