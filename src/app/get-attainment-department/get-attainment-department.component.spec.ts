import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAttainmentDepartmentComponent } from './get-attainment-department.component';

describe('GetAttainmentDepartmentComponent', () => {
  let component: GetAttainmentDepartmentComponent;
  let fixture: ComponentFixture<GetAttainmentDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAttainmentDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAttainmentDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
