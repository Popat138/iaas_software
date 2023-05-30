import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UgCoursesComponent } from './ug-courses.component';

describe('UgCoursesComponent', () => {
  let component: UgCoursesComponent;
  let fixture: ComponentFixture<UgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
