import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResearchProgramComponent } from './list-of-research-program.component';

describe('ListOfResearchProgramComponent', () => {
  let component: ListOfResearchProgramComponent;
  let fixture: ComponentFixture<ListOfResearchProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfResearchProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResearchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
