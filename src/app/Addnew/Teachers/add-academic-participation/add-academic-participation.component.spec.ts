import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicParticipationComponent } from './add-academic-participation.component';

describe('AddAcademicParticipationComponent', () => {
  let component: AddAcademicParticipationComponent;
  let fixture: ComponentFixture<AddAcademicParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicParticipationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
