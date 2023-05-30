import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLessonPlanComponent } from './edit-lesson-plan.component';

describe('EditLessonPlanComponent', () => {
  let component: EditLessonPlanComponent;
  let fixture: ComponentFixture<EditLessonPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLessonPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLessonPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
