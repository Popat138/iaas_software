import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAddNewCollegeComponent } from './super-admin-add-new-college.component';

describe('SuperAdminAddNewCollegeComponent', () => {
  let component: SuperAdminAddNewCollegeComponent;
  let fixture: ComponentFixture<SuperAdminAddNewCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminAddNewCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAddNewCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
