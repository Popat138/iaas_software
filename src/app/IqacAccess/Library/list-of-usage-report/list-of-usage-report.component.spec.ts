import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUsageReportComponent } from './list-of-usage-report.component';

describe('ListOfUsageReportComponent', () => {
  let component: ListOfUsageReportComponent;
  let fixture: ComponentFixture<ListOfUsageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfUsageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUsageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
