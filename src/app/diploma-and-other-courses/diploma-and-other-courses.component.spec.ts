import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaAndOtherCoursesComponent } from './diploma-and-other-courses.component';

describe('DiplomaAndOtherCoursesComponent', () => {
  let component: DiplomaAndOtherCoursesComponent;
  let fixture: ComponentFixture<DiplomaAndOtherCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaAndOtherCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaAndOtherCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
