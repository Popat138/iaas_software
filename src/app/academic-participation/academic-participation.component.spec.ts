import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicParticipationComponent } from './academic-participation.component';

describe('AcademicParticipationComponent', () => {
  let component: AcademicParticipationComponent;
  let fixture: ComponentFixture<AcademicParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicParticipationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
