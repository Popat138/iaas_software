import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewinternalAssessmentComponent } from './view-newinternal-assessment.component';

describe('ViewNewinternalAssessmentComponent', () => {
  let component: ViewNewinternalAssessmentComponent;
  let fixture: ComponentFixture<ViewNewinternalAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNewinternalAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewinternalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
