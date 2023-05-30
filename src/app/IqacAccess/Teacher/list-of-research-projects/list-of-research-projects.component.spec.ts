import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResearchProjectsComponent } from './list-of-research-projects.component';

describe('ListOfResearchProjectsComponent', () => {
  let component: ListOfResearchProjectsComponent;
  let fixture: ComponentFixture<ListOfResearchProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfResearchProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResearchProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
