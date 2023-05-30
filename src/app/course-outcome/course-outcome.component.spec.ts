import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOutcomeComponent } from './course-outcome.component';

describe('CourseOutcomeComponent', () => {
  let component: CourseOutcomeComponent;
  let fixture: ComponentFixture<CourseOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
