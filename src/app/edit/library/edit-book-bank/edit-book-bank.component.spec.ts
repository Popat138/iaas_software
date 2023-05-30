import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookBankComponent } from './edit-book-bank.component';

describe('EditBookBankComponent', () => {
  let component: EditBookBankComponent;
  let fixture: ComponentFixture<EditBookBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
