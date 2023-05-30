import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluminiFeedbackComponent } from './alumini-feedback.component';

describe('AluminiFeedbackComponent', () => {
  let component: AluminiFeedbackComponent;
  let fixture: ComponentFixture<AluminiFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AluminiFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AluminiFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
