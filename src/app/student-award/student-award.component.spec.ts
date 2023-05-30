import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAwardComponent } from './student-award.component';

describe('StudentAwardComponent', () => {
  let component: StudentAwardComponent;
  let fixture: ComponentFixture<StudentAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
