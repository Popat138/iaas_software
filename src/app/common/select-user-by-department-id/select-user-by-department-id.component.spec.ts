import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserByDepartmentIdComponent } from './select-user-by-department-id.component';

describe('SelectUserByDepartmentIdComponent', () => {
  let component: SelectUserByDepartmentIdComponent;
  let fixture: ComponentFixture<SelectUserByDepartmentIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUserByDepartmentIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserByDepartmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
