import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassoutStudentsComponent } from './passout-students.component';

describe('PassoutStudentsComponent', () => {
  let component: PassoutStudentsComponent;
  let fixture: ComponentFixture<PassoutStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassoutStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassoutStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
