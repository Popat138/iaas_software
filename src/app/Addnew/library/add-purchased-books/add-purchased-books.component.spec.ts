import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasedBooksComponent } from './add-purchased-books.component';

describe('AddPurchasedBooksComponent', () => {
  let component: AddPurchasedBooksComponent;
  let fixture: ComponentFixture<AddPurchasedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchasedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
