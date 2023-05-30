import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttandanceRecordComponent } from './add-attandance-record.component';

describe('AddAttandanceRecordComponent', () => {
  let component: AddAttandanceRecordComponent;
  let fixture: ComponentFixture<AddAttandanceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttandanceRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttandanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
