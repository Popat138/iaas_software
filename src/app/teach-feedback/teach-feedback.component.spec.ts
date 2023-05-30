import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachFeedbackComponent } from './teach-feedback.component';

describe('TeachFeedbackComponent', () => {
  let component: TeachFeedbackComponent;
  let fixture: ComponentFixture<TeachFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
