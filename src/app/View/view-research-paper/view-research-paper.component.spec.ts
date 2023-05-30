import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResearchPaperComponent } from './view-research-paper.component';

describe('ViewResearchPaperComponent', () => {
  let component: ViewResearchPaperComponent;
  let fixture: ComponentFixture<ViewResearchPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResearchPaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResearchPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
