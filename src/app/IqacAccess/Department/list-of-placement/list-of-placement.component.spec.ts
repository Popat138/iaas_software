import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPlacementComponent } from './list-of-placement.component';

describe('ListOfPlacementComponent', () => {
  let component: ListOfPlacementComponent;
  let fixture: ComponentFixture<ListOfPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
