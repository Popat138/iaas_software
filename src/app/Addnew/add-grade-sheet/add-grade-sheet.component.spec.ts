import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradeSheetComponent } from './add-grade-sheet.component';

describe('AddGradeSheetComponent', () => {
  let component: AddGradeSheetComponent;
  let fixture: ComponentFixture<AddGradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGradeSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
