import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDevelopmentProgramComponent } from './faculty-development-program.component';

describe('FacultyDevelopmentProgramComponent', () => {
  let component: FacultyDevelopmentProgramComponent;
  let fixture: ComponentFixture<FacultyDevelopmentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyDevelopmentProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyDevelopmentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
