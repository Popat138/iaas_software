import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAttainmentDetailComponent } from './get-attainment-detail.component';

describe('GetAttainmentDetailComponent', () => {
  let component: GetAttainmentDetailComponent;
  let fixture: ComponentFixture<GetAttainmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAttainmentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAttainmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
