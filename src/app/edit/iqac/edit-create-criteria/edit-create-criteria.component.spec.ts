import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateCriteriaComponent } from './edit-create-criteria.component';

describe('EditCreateCriteriaComponent', () => {
  let component: EditCreateCriteriaComponent;
  let fixture: ComponentFixture<EditCreateCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
