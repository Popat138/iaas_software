import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompetativeExamsComponent } from './list-of-competative-exams.component';

describe('ListOfCompetativeExamsComponent', () => {
  let component: ListOfCompetativeExamsComponent;
  let fixture: ComponentFixture<ListOfCompetativeExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCompetativeExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCompetativeExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
