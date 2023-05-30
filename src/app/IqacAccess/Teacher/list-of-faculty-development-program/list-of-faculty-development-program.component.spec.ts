import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFacultyDevelopmentProgramComponent } from './list-of-faculty-development-program.component';

describe('ListOfFacultyDevelopmentProgramComponent', () => {
  let component: ListOfFacultyDevelopmentProgramComponent;
  let fixture: ComponentFixture<ListOfFacultyDevelopmentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFacultyDevelopmentProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFacultyDevelopmentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
