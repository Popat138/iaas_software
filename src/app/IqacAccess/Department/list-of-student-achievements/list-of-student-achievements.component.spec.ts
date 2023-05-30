import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfStudentAchievementsComponent } from './list-of-student-achievements.component';

describe('ListOfStudentAchievementsComponent', () => {
  let component: ListOfStudentAchievementsComponent;
  let fixture: ComponentFixture<ListOfStudentAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfStudentAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfStudentAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
