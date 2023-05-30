import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRollCallDepartmentComponent } from './get-roll-call-department.component';

describe('GetRollCallDepartmentComponent', () => {
  let component: GetRollCallDepartmentComponent;
  let fixture: ComponentFixture<GetRollCallDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRollCallDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRollCallDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
