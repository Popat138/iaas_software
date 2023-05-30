import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommitteeMeetingDetailsComponent } from './edit-committee-meeting-details.component';

describe('EditCommitteeMeetingDetailsComponent', () => {
  let component: EditCommitteeMeetingDetailsComponent;
  let fixture: ComponentFixture<EditCommitteeMeetingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommitteeMeetingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommitteeMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
