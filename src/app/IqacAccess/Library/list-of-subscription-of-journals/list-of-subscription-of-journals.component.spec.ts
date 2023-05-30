import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSubscriptionOfJournalsComponent } from './list-of-subscription-of-journals.component';

describe('ListOfSubscriptionOfJournalsComponent', () => {
  let component: ListOfSubscriptionOfJournalsComponent;
  let fixture: ComponentFixture<ListOfSubscriptionOfJournalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfSubscriptionOfJournalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSubscriptionOfJournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
