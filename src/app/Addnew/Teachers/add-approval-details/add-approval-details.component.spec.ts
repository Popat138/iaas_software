import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprovalDetailsComponent } from './add-approval-details.component';

describe('AddApprovalDetailsComponent', () => {
  let component: AddApprovalDetailsComponent;
  let fixture: ComponentFixture<AddApprovalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApprovalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
