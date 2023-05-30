import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfApprovalComponent } from './list-of-approval.component';

describe('ListOfApprovalComponent', () => {
  let component: ListOfApprovalComponent;
  let fixture: ComponentFixture<ListOfApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
