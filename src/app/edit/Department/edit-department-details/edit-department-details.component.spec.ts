import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentDetailsComponent } from './edit-department-details.component';

describe('EditDepartmentDetailsComponent', () => {
  let component: EditDepartmentDetailsComponent;
  let fixture: ComponentFixture<EditDepartmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDepartmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepartmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
