import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUgCoursesComponent } from './list-of-ug-courses.component';

describe('ListOfUgCoursesComponent', () => {
  let component: ListOfUgCoursesComponent;
  let fixture: ComponentFixture<ListOfUgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfUgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
