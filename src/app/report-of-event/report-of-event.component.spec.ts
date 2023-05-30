import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfEventComponent } from './report-of-event.component';

describe('ReportOfEventComponent', () => {
  let component: ReportOfEventComponent;
  let fixture: ComponentFixture<ReportOfEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
