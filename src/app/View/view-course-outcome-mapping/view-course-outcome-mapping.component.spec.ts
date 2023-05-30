import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseOutcomeMappingComponent } from './view-course-outcome-mapping.component';

describe('ViewCourseOutcomeMappingComponent', () => {
  let component: ViewCourseOutcomeMappingComponent;
  let fixture: ComponentFixture<ViewCourseOutcomeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseOutcomeMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseOutcomeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
