import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradeSheetComponent } from './edit-grade-sheet.component';

describe('EditGradeSheetComponent', () => {
  let component: EditGradeSheetComponent;
  let fixture: ComponentFixture<EditGradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGradeSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
