import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchStudentInformationComponent } from './research-student-information.component';

describe('ResearchStudentInformationComponent', () => {
  let component: ResearchStudentInformationComponent;
  let fixture: ComponentFixture<ResearchStudentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchStudentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchStudentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
