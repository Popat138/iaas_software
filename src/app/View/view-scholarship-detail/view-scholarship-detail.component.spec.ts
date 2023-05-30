import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScholarshipDetailComponent } from './view-scholarship-detail.component';

describe('ViewScholarshipDetailComponent', () => {
  let component: ViewScholarshipDetailComponent;
  let fixture: ComponentFixture<ViewScholarshipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScholarshipDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScholarshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
