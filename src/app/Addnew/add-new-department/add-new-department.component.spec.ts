import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDepartmentComponent } from './add-new-department.component';

describe('AddNewDepartmentComponent', () => {
  let component: AddNewDepartmentComponent;
  let fixture: ComponentFixture<AddNewDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
