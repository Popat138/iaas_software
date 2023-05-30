import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDepartmentEventComponent } from './add-new-department-event.component';

describe('AddNewDepartmentEventComponent', () => {
  let component: AddNewDepartmentEventComponent;
  let fixture: ComponentFixture<AddNewDepartmentEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDepartmentEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDepartmentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
