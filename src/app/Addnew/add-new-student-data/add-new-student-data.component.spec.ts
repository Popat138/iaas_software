import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStudentDataComponent } from './add-new-student-data.component';

describe('AddNewStudentDataComponent', () => {
  let component: AddNewStudentDataComponent;
  let fixture: ComponentFixture<AddNewStudentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStudentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
