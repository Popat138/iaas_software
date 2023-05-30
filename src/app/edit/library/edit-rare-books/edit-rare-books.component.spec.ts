import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRareBooksComponent } from './edit-rare-books.component';

describe('EditRareBooksComponent', () => {
  let component: EditRareBooksComponent;
  let fixture: ComponentFixture<EditRareBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRareBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRareBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
