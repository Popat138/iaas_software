import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResearchStudentsDeclaredComponent } from './list-of-research-students-declared.component';

describe('ListOfResearchStudentsDeclaredComponent', () => {
  let component: ListOfResearchStudentsDeclaredComponent;
  let fixture: ComponentFixture<ListOfResearchStudentsDeclaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfResearchStudentsDeclaredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResearchStudentsDeclaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
