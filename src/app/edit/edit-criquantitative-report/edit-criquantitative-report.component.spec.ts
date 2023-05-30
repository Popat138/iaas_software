import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriquantitativeReportComponent } from './edit-criquantitative-report.component';

describe('EditCriquantitativeReportComponent', () => {
  let component: EditCriquantitativeReportComponent;
  let fixture: ComponentFixture<EditCriquantitativeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCriquantitativeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriquantitativeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
