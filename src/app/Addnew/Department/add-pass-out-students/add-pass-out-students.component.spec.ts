import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassOutStudentsComponent } from './add-pass-out-students.component';

describe('AddPassOutStudentsComponent', () => {
  let component: AddPassOutStudentsComponent;
  let fixture: ComponentFixture<AddPassOutStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPassOutStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPassOutStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
