import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnualUsageReportComponent } from './edit-annual-usage-report.component';

describe('EditAnnualUsageReportComponent', () => {
  let component: EditAnnualUsageReportComponent;
  let fixture: ComponentFixture<EditAnnualUsageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnnualUsageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnualUsageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
