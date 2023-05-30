import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenditureDetailComponent } from './view-expenditure-detail.component';

describe('ViewExpenditureDetailComponent', () => {
  let component: ViewExpenditureDetailComponent;
  let fixture: ComponentFixture<ViewExpenditureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExpenditureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExpenditureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
