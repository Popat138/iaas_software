import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarsAttendedComponent } from './seminars-attended.component';

describe('SeminarsAttendedComponent', () => {
  let component: SeminarsAttendedComponent;
  let fixture: ComponentFixture<SeminarsAttendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarsAttendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarsAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
