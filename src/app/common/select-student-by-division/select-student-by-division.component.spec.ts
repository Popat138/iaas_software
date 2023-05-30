import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudentByDivisionComponent } from './select-student-by-division.component';

describe('SelectStudentByDivisionComponent', () => {
  let component: SelectStudentByDivisionComponent;
  let fixture: ComponentFixture<SelectStudentByDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStudentByDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudentByDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
