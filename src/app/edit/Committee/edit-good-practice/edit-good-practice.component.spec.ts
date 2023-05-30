import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoodPracticeComponent } from './edit-good-practice.component';

describe('EditGoodPracticeComponent', () => {
  let component: EditGoodPracticeComponent;
  let fixture: ComponentFixture<EditGoodPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGoodPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGoodPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
