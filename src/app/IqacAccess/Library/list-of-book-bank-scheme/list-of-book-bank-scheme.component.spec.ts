import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBookBankSchemeComponent } from './list-of-book-bank-scheme.component';

describe('ListOfBookBankSchemeComponent', () => {
  let component: ListOfBookBankSchemeComponent;
  let fixture: ComponentFixture<ListOfBookBankSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBookBankSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBookBankSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
