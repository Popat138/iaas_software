import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCriteriaComponent } from './add-new-criteria.component';

describe('AddNewCriteriaComponent', () => {
  let component: AddNewCriteriaComponent;
  let fixture: ComponentFixture<AddNewCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
