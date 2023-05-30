import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentForProjectComponent } from './student-for-project.component';

describe('StudentForProjectComponent', () => {
  let component: StudentForProjectComponent;
  let fixture: ComponentFixture<StudentForProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentForProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentForProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
