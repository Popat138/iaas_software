import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectResearchProgramByDepartmentIdComponent } from './select-research-program-by-department-id.component';

describe('SelectResearchProgramByDepartmentIdComponent', () => {
  let component: SelectResearchProgramByDepartmentIdComponent;
  let fixture: ComponentFixture<SelectResearchProgramByDepartmentIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectResearchProgramByDepartmentIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectResearchProgramByDepartmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
