import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchProgramsComponent } from './research-programs.component';

describe('ResearchProgramsComponent', () => {
  let component: ResearchProgramsComponent;
  let fixture: ComponentFixture<ResearchProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
