import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAwardComponent } from './department-award.component';

describe('DepartmentAwardComponent', () => {
  let component: DepartmentAwardComponent;
  let fixture: ComponentFixture<DepartmentAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
