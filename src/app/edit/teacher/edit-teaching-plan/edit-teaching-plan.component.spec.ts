import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachingPlanComponent } from './edit-teaching-plan.component';

describe('EditTeachingPlanComponent', () => {
  let component: EditTeachingPlanComponent;
  let fixture: ComponentFixture<EditTeachingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeachingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeachingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
