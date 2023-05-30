import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchPapersComponent } from './add-research-papers.component';

describe('AddResearchPapersComponent', () => {
  let component: AddResearchPapersComponent;
  let fixture: ComponentFixture<AddResearchPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResearchPapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResearchPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
