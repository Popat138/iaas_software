import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProgramDetailsComponent } from './add-new-program-details.component';

describe('AddNewProgramDetailsComponent', () => {
  let component: AddNewProgramDetailsComponent;
  let fixture: ComponentFixture<AddNewProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewProgramDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
