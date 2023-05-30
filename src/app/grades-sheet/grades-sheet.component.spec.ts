import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesSheetComponent } from './grades-sheet.component';

describe('GradesSheetComponent', () => {
  let component: GradesSheetComponent;
  let fixture: ComponentFixture<GradesSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
