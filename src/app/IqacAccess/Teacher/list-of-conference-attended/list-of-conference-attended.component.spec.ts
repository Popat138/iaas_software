import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfConferenceAttendedComponent } from './list-of-conference-attended.component';

describe('ListOfConferenceAttendedComponent', () => {
  let component: ListOfConferenceAttendedComponent;
  let fixture: ComponentFixture<ListOfConferenceAttendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfConferenceAttendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfConferenceAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
