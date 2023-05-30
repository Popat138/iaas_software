import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityReportComponent } from './view-activity-report.component';

describe('ViewActivityReportComponent', () => {
  let component: ViewActivityReportComponent;
  let fixture: ComponentFixture<ViewActivityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActivityReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
