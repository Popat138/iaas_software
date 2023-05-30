import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlacementDetailsComponent } from './add-placement-details.component';

describe('AddPlacementDetailsComponent', () => {
  let component: AddPlacementDetailsComponent;
  let fixture: ComponentFixture<AddPlacementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlacementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlacementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
