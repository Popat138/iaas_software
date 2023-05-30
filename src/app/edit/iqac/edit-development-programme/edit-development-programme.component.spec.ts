import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevelopmentProgrammeComponent } from './edit-development-programme.component';

describe('EditDevelopmentProgrammeComponent', () => {
  let component: EditDevelopmentProgrammeComponent;
  let fixture: ComponentFixture<EditDevelopmentProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDevelopmentProgrammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDevelopmentProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
