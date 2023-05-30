import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResearchPapersComponent } from './list-of-research-papers.component';

describe('ListOfResearchPapersComponent', () => {
  let component: ListOfResearchPapersComponent;
  let fixture: ComponentFixture<ListOfResearchPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfResearchPapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResearchPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
