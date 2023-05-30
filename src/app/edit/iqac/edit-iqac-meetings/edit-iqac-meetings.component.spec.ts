import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIqacMeetingsComponent } from './edit-iqac-meetings.component';

describe('EditIqacMeetingsComponent', () => {
  let component: EditIqacMeetingsComponent;
  let fixture: ComponentFixture<EditIqacMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIqacMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIqacMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
