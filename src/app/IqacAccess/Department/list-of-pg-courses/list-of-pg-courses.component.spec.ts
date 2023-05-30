import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPgCoursesComponent } from './list-of-pg-courses.component';

describe('ListOfPgCoursesComponent', () => {
  let component: ListOfPgCoursesComponent;
  let fixture: ComponentFixture<ListOfPgCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPgCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPgCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
