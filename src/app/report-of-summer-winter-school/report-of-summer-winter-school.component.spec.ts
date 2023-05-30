import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfSummerWinterSchoolComponent } from './report-of-summer-winter-school.component';

describe('ReportOfSummerWinterSchoolComponent', () => {
  let component: ReportOfSummerWinterSchoolComponent;
  let fixture: ComponentFixture<ReportOfSummerWinterSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfSummerWinterSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfSummerWinterSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
