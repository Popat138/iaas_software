import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompetitiveexamsComponent } from './list-of-competitiveexams.component';

describe('ListOfCompetitiveexamsComponent', () => {
  let component: ListOfCompetitiveexamsComponent;
  let fixture: ComponentFixture<ListOfCompetitiveexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCompetitiveexamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCompetitiveexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
