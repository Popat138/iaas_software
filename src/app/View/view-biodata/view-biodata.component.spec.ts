import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBiodataComponent } from './view-biodata.component';

describe('ViewBiodataComponent', () => {
  let component: ViewBiodataComponent;
  let fixture: ComponentFixture<ViewBiodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBiodataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBiodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
