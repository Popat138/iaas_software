import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSummerWinterComponent } from './edit-summer-winter.component';

describe('EditSummerWinterComponent', () => {
  let component: EditSummerWinterComponent;
  let fixture: ComponentFixture<EditSummerWinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSummerWinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSummerWinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
