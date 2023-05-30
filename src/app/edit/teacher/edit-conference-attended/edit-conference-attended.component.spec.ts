import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConferenceAttendedComponent } from './edit-conference-attended.component';

describe('EditConferenceAttendedComponent', () => {
  let component: EditConferenceAttendedComponent;
  let fixture: ComponentFixture<EditConferenceAttendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConferenceAttendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConferenceAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
