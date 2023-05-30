import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDepartmentAwardComponent } from './add-new-department-award.component';

describe('AddNewDepartmentAwardComponent', () => {
  let component: AddNewDepartmentAwardComponent;
  let fixture: ComponentFixture<AddNewDepartmentAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDepartmentAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDepartmentAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
