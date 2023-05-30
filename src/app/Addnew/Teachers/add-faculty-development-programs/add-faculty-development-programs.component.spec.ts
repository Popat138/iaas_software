import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacultyDevelopmentProgramsComponent } from './add-faculty-development-programs.component';

describe('AddFacultyDevelopmentProgramsComponent', () => {
  let component: AddFacultyDevelopmentProgramsComponent;
  let fixture: ComponentFixture<AddFacultyDevelopmentProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFacultyDevelopmentProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFacultyDevelopmentProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
