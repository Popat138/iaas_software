import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertificateCoursesComponent } from './edit-certificate-courses.component';

describe('EditCertificateCoursesComponent', () => {
  let component: EditCertificateCoursesComponent;
  let fixture: ComponentFixture<EditCertificateCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCertificateCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCertificateCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
