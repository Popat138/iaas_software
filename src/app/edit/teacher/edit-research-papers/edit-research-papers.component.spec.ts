import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchPapersComponent } from './edit-research-papers.component';

describe('EditResearchPapersComponent', () => {
  let component: EditResearchPapersComponent;
  let fixture: ComponentFixture<EditResearchPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResearchPapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResearchPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
