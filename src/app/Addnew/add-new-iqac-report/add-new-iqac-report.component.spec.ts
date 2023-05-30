import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIqacReportComponent } from './add-new-iqac-report.component';

describe('AddNewIqacReportComponent', () => {
  let component: AddNewIqacReportComponent;
  let fixture: ComponentFixture<AddNewIqacReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewIqacReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIqacReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
