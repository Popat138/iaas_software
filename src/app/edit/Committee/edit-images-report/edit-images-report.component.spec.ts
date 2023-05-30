import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImagesReportComponent } from './edit-images-report.component';

describe('EditImagesReportComponent', () => {
  let component: EditImagesReportComponent;
  let fixture: ComponentFixture<EditImagesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImagesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImagesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
