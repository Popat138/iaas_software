import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesbookComponent } from './purchasesbook.component';

describe('PurchasesbookComponent', () => {
  let component: PurchasesbookComponent;
  let fixture: ComponentFixture<PurchasesbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
