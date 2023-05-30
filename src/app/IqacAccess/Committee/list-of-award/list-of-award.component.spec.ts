import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAwardComponent } from './list-of-award.component';

describe('ListOfAwardComponent', () => {
  let component: ListOfAwardComponent;
  let fixture: ComponentFixture<ListOfAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
