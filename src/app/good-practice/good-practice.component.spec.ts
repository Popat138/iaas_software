import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodPracticeComponent } from './good-practice.component';

describe('GoodPracticeComponent', () => {
  let component: GoodPracticeComponent;
  let fixture: ComponentFixture<GoodPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
