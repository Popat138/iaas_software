import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeminarsAttendedComponent } from './add-seminars-attended.component';

describe('AddSeminarsAttendedComponent', () => {
  let component: AddSeminarsAttendedComponent;
  let fixture: ComponentFixture<AddSeminarsAttendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeminarsAttendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeminarsAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
