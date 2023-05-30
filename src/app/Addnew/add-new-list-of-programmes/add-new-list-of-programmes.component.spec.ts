import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewListOfProgrammesComponent } from './add-new-list-of-programmes.component';

describe('AddNewListOfProgrammesComponent', () => {
  let component: AddNewListOfProgrammesComponent;
  let fixture: ComponentFixture<AddNewListOfProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewListOfProgrammesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewListOfProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
