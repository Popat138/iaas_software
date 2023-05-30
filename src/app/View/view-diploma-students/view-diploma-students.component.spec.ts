import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiplomaStudentsComponent } from './view-diploma-students.component';

describe('ViewDiplomaStudentsComponent', () => {
  let component: ViewDiplomaStudentsComponent;
  let fixture: ComponentFixture<ViewDiplomaStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiplomaStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiplomaStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
