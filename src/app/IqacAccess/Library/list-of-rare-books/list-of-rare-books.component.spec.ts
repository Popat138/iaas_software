import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRareBooksComponent } from './list-of-rare-books.component';

describe('ListOfRareBooksComponent', () => {
  let component: ListOfRareBooksComponent;
  let fixture: ComponentFixture<ListOfRareBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfRareBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRareBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
