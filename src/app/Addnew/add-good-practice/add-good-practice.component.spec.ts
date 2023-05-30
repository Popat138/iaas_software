import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodPracticeComponent } from './add-good-practice.component';

describe('AddGoodPracticeComponent', () => {
  let component: AddGoodPracticeComponent;
  let fixture: ComponentFixture<AddGoodPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoodPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoodPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
