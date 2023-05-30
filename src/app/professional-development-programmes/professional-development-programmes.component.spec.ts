import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalDevelopmentProgrammesComponent } from './professional-development-programmes.component';

describe('ProfessionalDevelopmentProgrammesComponent', () => {
  let component: ProfessionalDevelopmentProgrammesComponent;
  let fixture: ComponentFixture<ProfessionalDevelopmentProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalDevelopmentProgrammesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalDevelopmentProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
