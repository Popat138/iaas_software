import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsubscriptionComponent } from './journalsubscription.component';

describe('JournalsubscriptionComponent', () => {
  let component: JournalsubscriptionComponent;
  let fixture: ComponentFixture<JournalsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalsubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
