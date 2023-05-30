import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDevelopmentProgramComponent } from './add-new-development-program.component';

describe('AddNewDevelopmentProgramComponent', () => {
  let component: AddNewDevelopmentProgramComponent;
  let fixture: ComponentFixture<AddNewDevelopmentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDevelopmentProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDevelopmentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
