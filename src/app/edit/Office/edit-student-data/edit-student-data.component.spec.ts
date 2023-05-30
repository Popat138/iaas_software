import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentDataComponent } from './edit-student-data.component';

describe('EditStudentDataComponent', () => {
  let component: EditStudentDataComponent;
  let fixture: ComponentFixture<EditStudentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
