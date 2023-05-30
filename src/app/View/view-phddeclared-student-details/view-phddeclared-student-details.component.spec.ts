import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPHDDeclaredStudentDetailsComponent } from './view-phddeclared-student-details.component';

describe('ViewPHDDeclaredStudentDetailsComponent', () => {
  let component: ViewPHDDeclaredStudentDetailsComponent;
  let fixture: ComponentFixture<ViewPHDDeclaredStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPHDDeclaredStudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPHDDeclaredStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
