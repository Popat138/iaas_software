import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdmittedStudentComponent } from './edit-admitted-student.component';

describe('EditAdmittedStudentComponent', () => {
  let component: EditAdmittedStudentComponent;
  let fixture: ComponentFixture<EditAdmittedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdmittedStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdmittedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
