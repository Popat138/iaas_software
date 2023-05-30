import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentRollListComponent } from './add-student-roll-list.component';

describe('AddStudentRollListComponent', () => {
  let component: AddStudentRollListComponent;
  let fixture: ComponentFixture<AddStudentRollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentRollListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentRollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
