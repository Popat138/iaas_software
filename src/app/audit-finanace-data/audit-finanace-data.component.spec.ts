import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditFinanaceDataComponent } from './audit-finanace-data.component';

describe('AuditFinanaceDataComponent', () => {
  let component: AuditFinanaceDataComponent;
  let fixture: ComponentFixture<AuditFinanaceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditFinanaceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditFinanaceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
