import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRollCallDataComponent } from './add-new-roll-call-data.component';

describe('AddNewRollCallDataComponent', () => {
  let component: AddNewRollCallDataComponent;
  let fixture: ComponentFixture<AddNewRollCallDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRollCallDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRollCallDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
