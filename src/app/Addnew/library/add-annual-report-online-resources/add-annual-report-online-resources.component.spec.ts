import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnualReportOnlineResourcesComponent } from './add-annual-report-online-resources.component';

describe('AddAnnualReportOnlineResourcesComponent', () => {
  let component: AddAnnualReportOnlineResourcesComponent;
  let fixture: ComponentFixture<AddAnnualReportOnlineResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnualReportOnlineResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnnualReportOnlineResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
