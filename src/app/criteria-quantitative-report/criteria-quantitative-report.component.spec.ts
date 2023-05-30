import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaQuantitativeReportComponent } from './criteria-quantitative-report.component';

describe('CriteriaQuantitativeReportComponent', () => {
  let component: CriteriaQuantitativeReportComponent;
  let fixture: ComponentFixture<CriteriaQuantitativeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaQuantitativeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaQuantitativeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
