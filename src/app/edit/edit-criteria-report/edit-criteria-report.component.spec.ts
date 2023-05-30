import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriteriaReportComponent } from './edit-criteria-report.component';

describe('EditCriteriaReportComponent', () => {
  let component: EditCriteriaReportComponent;
  let fixture: ComponentFixture<EditCriteriaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCriteriaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriteriaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
