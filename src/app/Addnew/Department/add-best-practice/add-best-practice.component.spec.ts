import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBestPracticeComponent } from './add-best-practice.component';

describe('AddBestPracticeComponent', () => {
  let component: AddBestPracticeComponent;
  let fixture: ComponentFixture<AddBestPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBestPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBestPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
