import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectResearchProgramListByDepartmentComponent } from './select-research-program-list-by-department.component';

describe('SelectResearchProgramListByDepartmentComponent', () => {
  let component: SelectResearchProgramListByDepartmentComponent;
  let fixture: ComponentFixture<SelectResearchProgramListByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectResearchProgramListByDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectResearchProgramListByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
