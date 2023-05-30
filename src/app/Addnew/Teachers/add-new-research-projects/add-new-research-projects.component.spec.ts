import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewResearchProjectsComponent } from './add-new-research-projects.component';

describe('AddNewResearchProjectsComponent', () => {
  let component: AddNewResearchProjectsComponent;
  let fixture: ComponentFixture<AddNewResearchProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewResearchProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewResearchProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
