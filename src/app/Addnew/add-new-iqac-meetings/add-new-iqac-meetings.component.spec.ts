import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIqacMeetingsComponent } from './add-new-iqac-meetings.component';

describe('AddNewIqacMeetingsComponent', () => {
  let component: AddNewIqacMeetingsComponent;
  let fixture: ComponentFixture<AddNewIqacMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewIqacMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIqacMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
