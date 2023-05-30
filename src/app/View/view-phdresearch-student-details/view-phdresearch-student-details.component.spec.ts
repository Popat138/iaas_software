import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPHDResearchStudentDetailsComponent } from './view-phdresearch-student-details.component';

describe('ViewPHDResearchStudentDetailsComponent', () => {
  let component: ViewPHDResearchStudentDetailsComponent;
  let fixture: ComponentFixture<ViewPHDResearchStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPHDResearchStudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPHDResearchStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
