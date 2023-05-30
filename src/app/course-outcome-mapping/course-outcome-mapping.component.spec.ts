import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOutcomeMappingComponent } from './course-outcome-mapping.component';

describe('CourseOutcomeMappingComponent', () => {
  let component: CourseOutcomeMappingComponent;
  let fixture: ComponentFixture<CourseOutcomeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseOutcomeMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOutcomeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
