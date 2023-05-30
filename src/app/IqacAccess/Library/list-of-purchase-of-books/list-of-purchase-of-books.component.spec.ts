import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPurchaseOfBooksComponent } from './list-of-purchase-of-books.component';

describe('ListOfPurchaseOfBooksComponent', () => {
  let component: ListOfPurchaseOfBooksComponent;
  let fixture: ComponentFixture<ListOfPurchaseOfBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPurchaseOfBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPurchaseOfBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
