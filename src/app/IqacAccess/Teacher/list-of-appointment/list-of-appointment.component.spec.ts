import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAppointmentComponent } from './list-of-appointment.component';

describe('ListOfAppointmentComponent', () => {
  let component: ListOfAppointmentComponent;
  let fixture: ComponentFixture<ListOfAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
