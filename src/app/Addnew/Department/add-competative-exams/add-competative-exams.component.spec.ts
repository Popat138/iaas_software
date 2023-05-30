import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetativeExamsComponent } from './add-competative-exams.component';

describe('AddCompetativeExamsComponent', () => {
  let component: AddCompetativeExamsComponent;
  let fixture: ComponentFixture<AddCompetativeExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompetativeExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompetativeExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
