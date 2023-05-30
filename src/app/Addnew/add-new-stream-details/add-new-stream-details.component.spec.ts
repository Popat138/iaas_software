import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStreamDetailsComponent } from './add-new-stream-details.component';

describe('AddNewStreamDetailsComponent', () => {
  let component: AddNewStreamDetailsComponent;
  let fixture: ComponentFixture<AddNewStreamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStreamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStreamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
