import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCriteriaQuantitativeComponent } from './view-criteria-quantitative.component';

describe('ViewCriteriaQuantitativeComponent', () => {
  let component: ViewCriteriaQuantitativeComponent;
  let fixture: ComponentFixture<ViewCriteriaQuantitativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCriteriaQuantitativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCriteriaQuantitativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
