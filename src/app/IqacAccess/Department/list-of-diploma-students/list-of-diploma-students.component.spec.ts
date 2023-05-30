import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDiplomaStudentsComponent } from './list-of-diploma-students.component';

describe('ListOfDiplomaStudentsComponent', () => {
  let component: ListOfDiplomaStudentsComponent;
  let fixture: ComponentFixture<ListOfDiplomaStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfDiplomaStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfDiplomaStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
