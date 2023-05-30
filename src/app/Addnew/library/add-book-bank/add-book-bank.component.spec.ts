import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookBankComponent } from './add-book-bank.component';

describe('AddBookBankComponent', () => {
  let component: AddBookBankComponent;
  let fixture: ComponentFixture<AddBookBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
