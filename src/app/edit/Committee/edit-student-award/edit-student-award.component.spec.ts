import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentAwardComponent } from './edit-student-award.component';

describe('EditStudentAwardComponent', () => {
  let component: EditStudentAwardComponent;
  let fixture: ComponentFixture<EditStudentAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
