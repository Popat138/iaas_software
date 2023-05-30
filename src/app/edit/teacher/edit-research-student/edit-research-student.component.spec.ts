import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchStudentComponent } from './edit-research-student.component';

describe('EditResearchStudentComponent', () => {
  let component: EditResearchStudentComponent;
  let fixture: ComponentFixture<EditResearchStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResearchStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResearchStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
