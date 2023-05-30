import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResearchStudentsComponent } from './list-research-students.component';

describe('ListResearchStudentsComponent', () => {
  let component: ListResearchStudentsComponent;
  let fixture: ComponentFixture<ListResearchStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResearchStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResearchStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
