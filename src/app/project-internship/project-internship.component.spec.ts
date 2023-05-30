import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInternshipComponent } from './project-internship.component';

describe('ProjectInternshipComponent', () => {
  let component: ProjectInternshipComponent;
  let fixture: ComponentFixture<ProjectInternshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInternshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
