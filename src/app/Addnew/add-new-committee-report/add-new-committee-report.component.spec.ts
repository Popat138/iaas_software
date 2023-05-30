import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCommitteeReportComponent } from './add-new-committee-report.component';

describe('AddNewCommitteeReportComponent', () => {
  let component: AddNewCommitteeReportComponent;
  let fixture: ComponentFixture<AddNewCommitteeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCommitteeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCommitteeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
