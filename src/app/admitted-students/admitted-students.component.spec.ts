import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittedStudentsComponent } from './admitted-students.component';

describe('AdmittedStudentsComponent', () => {
  let component: AdmittedStudentsComponent;
  let fixture: ComponentFixture<AdmittedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmittedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
