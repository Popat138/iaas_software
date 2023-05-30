import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCourcesComponent } from './certificate-cources.component';

describe('CertificateCourcesComponent', () => {
  let component: CertificateCourcesComponent;
  let fixture: ComponentFixture<CertificateCourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateCourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateCourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
