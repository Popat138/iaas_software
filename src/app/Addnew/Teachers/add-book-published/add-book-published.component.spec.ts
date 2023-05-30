import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookPublishedComponent } from './add-book-published.component';

describe('AddBookPublishedComponent', () => {
  let component: AddBookPublishedComponent;
  let fixture: ComponentFixture<AddBookPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookPublishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
