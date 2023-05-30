import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPgCoursesComponent } from './add-pg-courses.component';

describe('AddPgCoursesComponent', () => {
  let component: AddPgCoursesComponent;
  let fixture: ComponentFixture<AddPgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
