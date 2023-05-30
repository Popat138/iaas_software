import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCriteriaReportsComponent } from './view-criteria-reports.component';

describe('ViewCriteriaReportsComponent', () => {
  let component: ViewCriteriaReportsComponent;
  let fixture: ComponentFixture<ViewCriteriaReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCriteriaReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCriteriaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
