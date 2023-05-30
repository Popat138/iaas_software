import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeachingPlanComponent } from './view-teaching-plan.component';

describe('ViewTeachingPlanComponent', () => {
  let component: ViewTeachingPlanComponent;
  let fixture: ComponentFixture<ViewTeachingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeachingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeachingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
