import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAuditFinanceComponent } from './list-of-audit-finance.component';

describe('ListOfAuditFinanceComponent', () => {
  let component: ListOfAuditFinanceComponent;
  let fixture: ComponentFixture<ListOfAuditFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAuditFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAuditFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
