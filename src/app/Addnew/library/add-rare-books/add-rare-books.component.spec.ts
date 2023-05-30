import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRareBooksComponent } from './add-rare-books.component';

describe('AddRareBooksComponent', () => {
  let component: AddRareBooksComponent;
  let fixture: ComponentFixture<AddRareBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRareBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRareBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
