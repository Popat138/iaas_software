import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriteriaReportComponent } from './add-criteria-report.component';

describe('AddCriteriaReportComponent', () => {
  let component: AddCriteriaReportComponent;
  let fixture: ComponentFixture<AddCriteriaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCriteriaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriteriaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
