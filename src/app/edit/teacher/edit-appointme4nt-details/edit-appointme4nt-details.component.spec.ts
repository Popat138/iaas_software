import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointme4ntDetailsComponent } from './edit-appointme4nt-details.component';

describe('EditAppointme4ntDetailsComponent', () => {
  let component: EditAppointme4ntDetailsComponent;
  let fixture: ComponentFixture<EditAppointme4ntDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointme4ntDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointme4ntDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
