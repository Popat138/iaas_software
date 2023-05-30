import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateDepartmentComponent } from './edit-create-department.component';

describe('EditCreateDepartmentComponent', () => {
  let component: EditCreateDepartmentComponent;
  let fixture: ComponentFixture<EditCreateDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
