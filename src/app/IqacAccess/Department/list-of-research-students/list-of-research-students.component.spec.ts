import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResearchStudentsComponent } from './list-of-research-students.component';

describe('ListOfResearchStudentsComponent', () => {
  let component: ListOfResearchStudentsComponent;
  let fixture: ComponentFixture<ListOfResearchStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfResearchStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResearchStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
