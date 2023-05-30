import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachingPlanComponent } from './add-teaching-plan.component';

describe('AddTeachingPlanComponent', () => {
  let component: AddTeachingPlanComponent;
  let fixture: ComponentFixture<AddTeachingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeachingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeachingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
