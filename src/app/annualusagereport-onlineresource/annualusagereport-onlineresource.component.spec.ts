import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualusagereportOnlineresourceComponent } from './annualusagereport-onlineresource.component';

describe('AnnualusagereportOnlineresourceComponent', () => {
  let component: AnnualusagereportOnlineresourceComponent;
  let fixture: ComponentFixture<AnnualusagereportOnlineresourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualusagereportOnlineresourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualusagereportOnlineresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
