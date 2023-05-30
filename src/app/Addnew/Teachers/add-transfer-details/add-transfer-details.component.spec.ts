import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransferDetailsComponent } from './add-transfer-details.component';

describe('AddTransferDetailsComponent', () => {
  let component: AddTransferDetailsComponent;
  let fixture: ComponentFixture<AddTransferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransferDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
