import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfIqacActivitiesComponent } from './report-of-iqac-activities.component';

describe('ReportOfIqacActivitiesComponent', () => {
  let component: ReportOfIqacActivitiesComponent;
  let fixture: ComponentFixture<ReportOfIqacActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfIqacActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfIqacActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
