import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAcademicParticipationComponent } from './list-of-academic-participation.component';

describe('ListOfAcademicParticipationComponent', () => {
  let component: ListOfAcademicParticipationComponent;
  let fixture: ComponentFixture<ListOfAcademicParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAcademicParticipationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAcademicParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
