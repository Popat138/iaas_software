import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJournalSubscriptionComponent } from './edit-journal-subscription.component';

describe('EditJournalSubscriptionComponent', () => {
  let component: EditJournalSubscriptionComponent;
  let fixture: ComponentFixture<EditJournalSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJournalSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJournalSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
