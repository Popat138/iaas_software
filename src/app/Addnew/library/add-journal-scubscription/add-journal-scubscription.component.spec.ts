import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalScubscriptionComponent } from './add-journal-scubscription.component';

describe('AddJournalScubscriptionComponent', () => {
  let component: AddJournalScubscriptionComponent;
  let fixture: ComponentFixture<AddJournalScubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJournalScubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJournalScubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
