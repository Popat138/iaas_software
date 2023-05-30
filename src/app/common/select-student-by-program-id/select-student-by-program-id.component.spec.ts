import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentByProgramIdComponent } from './select-student-by-program-id.component';

describe('SelectStudentByProgramIdComponent', () => {
  let component: SelectStudentByProgramIdComponent;
  let fixture: ComponentFixture<SelectStudentByProgramIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStudentByProgramIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentByProgramIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
