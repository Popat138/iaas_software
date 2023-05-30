import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMeetingsComponent } from './list-of-meetings.component';

describe('ListOfMeetingsComponent', () => {
  let component: ListOfMeetingsComponent;
  let fixture: ComponentFixture<ListOfMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
