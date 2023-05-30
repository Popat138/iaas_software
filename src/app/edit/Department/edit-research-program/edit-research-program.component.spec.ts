import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResearchProgramComponent } from './edit-research-program.component';

describe('EditResearchProgramComponent', () => {
  let component: EditResearchProgramComponent;
  let fixture: ComponentFixture<EditResearchProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResearchProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResearchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
