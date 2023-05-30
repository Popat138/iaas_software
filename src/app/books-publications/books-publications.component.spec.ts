import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPublicationsComponent } from './books-publications.component';

describe('BooksPublicationsComponent', () => {
  let component: BooksPublicationsComponent;
  let fixture: ComponentFixture<BooksPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
