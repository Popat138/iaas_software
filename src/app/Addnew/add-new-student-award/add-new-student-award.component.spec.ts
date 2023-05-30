import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStudentAwardComponent } from './add-new-student-award.component';

describe('AddNewStudentAwardComponent', () => {
  let component: AddNewStudentAwardComponent;
  let fixture: ComponentFixture<AddNewStudentAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStudentAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStudentAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
