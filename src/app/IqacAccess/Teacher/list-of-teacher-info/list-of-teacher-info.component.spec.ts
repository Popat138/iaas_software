import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTeacherInfoComponent } from './list-of-teacher-info.component';

describe('ListOfTeacherInfoComponent', () => {
  let component: ListOfTeacherInfoComponent;
  let fixture: ComponentFixture<ListOfTeacherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTeacherInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTeacherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
