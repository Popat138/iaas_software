import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBiodataiqacComponent } from './view-biodataiqac.component';

describe('ViewBiodataiqacComponent', () => {
  let component: ViewBiodataiqacComponent;
  let fixture: ComponentFixture<ViewBiodataiqacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBiodataiqacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBiodataiqacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
