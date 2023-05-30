import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIqacReportComponent } from './edit-iqac-report.component';

describe('EditIqacReportComponent', () => {
  let component: EditIqacReportComponent;
  let fixture: ComponentFixture<EditIqacReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIqacReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIqacReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
