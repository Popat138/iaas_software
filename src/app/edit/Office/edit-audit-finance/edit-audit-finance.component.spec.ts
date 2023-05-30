import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuditFinanceComponent } from './edit-audit-finance.component';

describe('EditAuditFinanceComponent', () => {
  let component: EditAuditFinanceComponent;
  let fixture: ComponentFixture<EditAuditFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAuditFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuditFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
