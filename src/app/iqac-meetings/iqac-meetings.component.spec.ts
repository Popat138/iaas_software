import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqacMeetingsComponent } from './iqac-meetings.component';

describe('IqacMeetingsComponent', () => {
  let component: IqacMeetingsComponent;
  let fixture: ComponentFixture<IqacMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IqacMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IqacMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
