import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAuditAndFinanceDataComponent } from './add-new-audit-and-finance-data.component';

describe('AddNewAuditAndFinanceDataComponent', () => {
  let component: AddNewAuditAndFinanceDataComponent;
  let fixture: ComponentFixture<AddNewAuditAndFinanceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAuditAndFinanceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAuditAndFinanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
