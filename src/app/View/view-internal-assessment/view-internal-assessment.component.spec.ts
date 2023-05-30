import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInternalAssessmentComponent } from './view-internal-assessment.component';

describe('ViewInternalAssessmentComponent', () => {
  let component: ViewInternalAssessmentComponent;
  let fixture: ComponentFixture<ViewInternalAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInternalAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInternalAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
