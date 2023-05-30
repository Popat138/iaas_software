import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUgCoursesComponent } from './add-ug-courses.component';

describe('AddUgCoursesComponent', () => {
  let component: AddUgCoursesComponent;
  let fixture: ComponentFixture<AddUgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
