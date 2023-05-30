import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProgramByCollegeIdComponent } from './select-program-by-college-id.component';

describe('SelectProgramByCollegeIdComponent', () => {
  let component: SelectProgramByCollegeIdComponent;
  let fixture: ComponentFixture<SelectProgramByCollegeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProgramByCollegeIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProgramByCollegeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
