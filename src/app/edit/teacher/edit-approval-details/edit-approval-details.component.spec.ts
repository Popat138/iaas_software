import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApprovalDetailsComponent } from './edit-approval-details.component';

describe('EditApprovalDetailsComponent', () => {
  let component: EditApprovalDetailsComponent;
  let fixture: ComponentFixture<EditApprovalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApprovalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
