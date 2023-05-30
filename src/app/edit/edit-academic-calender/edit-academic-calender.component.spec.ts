import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcademicCalenderComponent } from './edit-academic-calender.component';

describe('EditAcademicCalenderComponent', () => {
  let component: EditAcademicCalenderComponent;
  let fixture: ComponentFixture<EditAcademicCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcademicCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcademicCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
