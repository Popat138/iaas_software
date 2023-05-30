import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIQACMeetingDetailComponent } from './view-iqacmeeting-detail.component';

describe('ViewIQACMeetingDetailComponent', () => {
  let component: ViewIQACMeetingDetailComponent;
  let fixture: ComponentFixture<ViewIQACMeetingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIQACMeetingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIQACMeetingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
