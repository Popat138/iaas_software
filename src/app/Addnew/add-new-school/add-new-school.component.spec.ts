import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSchoolComponent } from './add-new-school.component';

describe('AddNewSchoolComponent', () => {
  let component: AddNewSchoolComponent;
  let fixture: ComponentFixture<AddNewSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
