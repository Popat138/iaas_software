import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLessonPlanComponent } from './view-lesson-plan.component';

describe('ViewLessonPlanComponent', () => {
  let component: ViewLessonPlanComponent;
  let fixture: ComponentFixture<ViewLessonPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLessonPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLessonPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
