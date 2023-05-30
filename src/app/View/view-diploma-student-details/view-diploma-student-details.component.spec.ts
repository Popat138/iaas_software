import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiplomaStudentDetailsComponent } from './view-diploma-student-details.component';

describe('ViewDiplomaStudentDetailsComponent', () => {
  let component: ViewDiplomaStudentDetailsComponent;
  let fixture: ComponentFixture<ViewDiplomaStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiplomaStudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiplomaStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
