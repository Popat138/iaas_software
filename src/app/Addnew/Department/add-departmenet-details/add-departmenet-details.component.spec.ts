import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmenetDetailsComponent } from './add-departmenet-details.component';

describe('AddDepartmenetDetailsComponent', () => {
  let component: AddDepartmenetDetailsComponent;
  let fixture: ComponentFixture<AddDepartmenetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmenetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmenetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
