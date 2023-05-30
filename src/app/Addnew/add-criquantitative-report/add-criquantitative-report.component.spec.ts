import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriquantitativeReportComponent } from './add-criquantitative-report.component';

describe('AddCriquantitativeReportComponent', () => {
  let component: AddCriquantitativeReportComponent;
  let fixture: ComponentFixture<AddCriquantitativeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCriquantitativeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCriquantitativeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
