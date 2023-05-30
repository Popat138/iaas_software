import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUgResultsComponent } from './list-of-ug-results.component';

describe('ListOfUgResultsComponent', () => {
  let component: ListOfUgResultsComponent;
  let fixture: ComponentFixture<ListOfUgResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfUgResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUgResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
