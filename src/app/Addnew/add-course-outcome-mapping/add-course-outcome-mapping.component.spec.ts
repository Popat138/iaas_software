import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseOutcomeMappingComponent } from './add-course-outcome-mapping.component';

describe('AddCourseOutcomeMappingComponent', () => {
  let component: AddCourseOutcomeMappingComponent;
  let fixture: ComponentFixture<AddCourseOutcomeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseOutcomeMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseOutcomeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
