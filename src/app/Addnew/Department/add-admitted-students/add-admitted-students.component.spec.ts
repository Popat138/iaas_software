import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmittedStudentsComponent } from './add-admitted-students.component';

describe('AddAdmittedStudentsComponent', () => {
  let component: AddAdmittedStudentsComponent;
  let fixture: ComponentFixture<AddAdmittedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdmittedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdmittedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
