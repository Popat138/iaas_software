import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYearDetailsComponent } from './new-year-details.component';

describe('NewYearDetailsComponent', () => {
  let component: NewYearDetailsComponent;
  let fixture: ComponentFixture<NewYearDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewYearDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewYearDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
