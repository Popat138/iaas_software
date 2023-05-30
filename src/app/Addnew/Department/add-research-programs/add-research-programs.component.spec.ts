import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchProgramsComponent } from './add-research-programs.component';

describe('AddResearchProgramsComponent', () => {
  let component: AddResearchProgramsComponent;
  let fixture: ComponentFixture<AddResearchProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResearchProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResearchProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
