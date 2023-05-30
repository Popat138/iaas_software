import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPgResultsComponent } from './list-of-pg-results.component';

describe('ListOfPgResultsComponent', () => {
  let component: ListOfPgResultsComponent;
  let fixture: ComponentFixture<ListOfPgResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPgResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPgResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
