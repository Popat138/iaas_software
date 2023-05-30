import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceExpenditureDetailComponent } from './view-maintenance-expenditure-detail.component';

describe('ViewMaintenanceExpenditureDetailComponent', () => {
  let component: ViewMaintenanceExpenditureDetailComponent;
  let fixture: ComponentFixture<ViewMaintenanceExpenditureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMaintenanceExpenditureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMaintenanceExpenditureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
