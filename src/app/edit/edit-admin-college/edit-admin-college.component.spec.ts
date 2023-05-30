import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminCollegeComponent } from './edit-admin-college.component';

describe('EditAdminCollegeComponent', () => {
  let component: EditAdminCollegeComponent;
  let fixture: ComponentFixture<EditAdminCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
