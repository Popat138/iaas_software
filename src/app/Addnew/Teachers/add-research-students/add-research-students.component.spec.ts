import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchStudentsComponent } from './add-research-students.component';

describe('AddResearchStudentsComponent', () => {
  let component: AddResearchStudentsComponent;
  let fixture: ComponentFixture<AddResearchStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResearchStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResearchStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
