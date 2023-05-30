import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListOfProgrammesComponent } from './edit-list-of-programmes.component';

describe('EditListOfProgrammesComponent', () => {
  let component: EditListOfProgrammesComponent;
  let fixture: ComponentFixture<EditListOfProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListOfProgrammesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListOfProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
