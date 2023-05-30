import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchasedBooksComponent } from './edit-purchased-books.component';

describe('EditPurchasedBooksComponent', () => {
  let component: EditPurchasedBooksComponent;
  let fixture: ComponentFixture<EditPurchasedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchasedBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPurchasedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
