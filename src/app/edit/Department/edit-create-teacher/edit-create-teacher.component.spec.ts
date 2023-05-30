import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateTeacherComponent } from './edit-create-teacher.component';

describe('EditCreateTeacherComponent', () => {
  let component: EditCreateTeacherComponent;
  let fixture: ComponentFixture<EditCreateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
