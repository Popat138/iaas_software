import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsFeedbackComponent } from './parents-feedback.component';

describe('ParentsFeedbackComponent', () => {
  let component: ParentsFeedbackComponent;
  let fixture: ComponentFixture<ParentsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
