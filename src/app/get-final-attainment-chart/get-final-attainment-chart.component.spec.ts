import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFinalAttainmentChartComponent } from './get-final-attainment-chart.component';

describe('GetFinalAttainmentChartComponent', () => {
  let component: GetFinalAttainmentChartComponent;
  let fixture: ComponentFixture<GetFinalAttainmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFinalAttainmentChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFinalAttainmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
