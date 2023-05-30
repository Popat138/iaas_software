import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacultyDevelopmentProgramComponent } from './edit-faculty-development-program.component';

describe('EditFacultyDevelopmentProgramComponent', () => {
  let component: EditFacultyDevelopmentProgramComponent;
  let fixture: ComponentFixture<EditFacultyDevelopmentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacultyDevelopmentProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFacultyDevelopmentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
