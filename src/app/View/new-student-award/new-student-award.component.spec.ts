import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentAwardComponent } from './new-student-award.component';

describe('NewStudentAwardComponent', () => {
  let component: NewStudentAwardComponent;
  let fixture: ComponentFixture<NewStudentAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStudentAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudentAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
