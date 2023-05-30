import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProgramByDepartmentIdComponent } from './select-program-by-department-id.component';

describe('SelectProgramByDepartmentIdComponent', () => {
  let component: SelectProgramByDepartmentIdComponent;
  let fixture: ComponentFixture<SelectProgramByDepartmentIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProgramByDepartmentIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProgramByDepartmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
