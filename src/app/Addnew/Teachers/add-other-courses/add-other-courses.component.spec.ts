import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherCoursesComponent } from './add-other-courses.component';

describe('AddOtherCoursesComponent', () => {
  let component: AddOtherCoursesComponent;
  let fixture: ComponentFixture<AddOtherCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
