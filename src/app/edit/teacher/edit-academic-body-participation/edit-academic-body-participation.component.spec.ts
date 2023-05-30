import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcademicBodyParticipationComponent } from './edit-academic-body-participation.component';

describe('EditAcademicBodyParticipationComponent', () => {
  let component: EditAcademicBodyParticipationComponent;
  let fixture: ComponentFixture<EditAcademicBodyParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcademicBodyParticipationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcademicBodyParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
