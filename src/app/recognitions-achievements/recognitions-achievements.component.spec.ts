import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionsAchievementsComponent } from './recognitions-achievements.component';

describe('RecognitionsAchievementsComponent', () => {
  let component: RecognitionsAchievementsComponent;
  let fixture: ComponentFixture<RecognitionsAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognitionsAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognitionsAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
