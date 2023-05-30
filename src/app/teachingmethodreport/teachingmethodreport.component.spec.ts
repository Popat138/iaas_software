import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingmethodreportComponent } from './teachingmethodreport.component';

describe('TeachingmethodreportComponent', () => {
  let component: TeachingmethodreportComponent;
  let fixture: ComponentFixture<TeachingmethodreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingmethodreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingmethodreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
