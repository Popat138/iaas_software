import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentForRollComponent } from './select-student-for-roll.component';

describe('SelectStudentForRollComponent', () => {
  let component: SelectStudentForRollComponent;
  let fixture: ComponentFixture<SelectStudentForRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStudentForRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentForRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
