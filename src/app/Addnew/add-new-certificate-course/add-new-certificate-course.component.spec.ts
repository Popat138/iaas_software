import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCertificateCourseComponent } from './add-new-certificate-course.component';

describe('AddNewCertificateCourseComponent', () => {
  let component: AddNewCertificateCourseComponent;
  let fixture: ComponentFixture<AddNewCertificateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCertificateCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCertificateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
