import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLayoutComponent } from './office-layout.component';

describe('OfficeLayoutComponent', () => {
  let component: OfficeLayoutComponent;
  let fixture: ComponentFixture<OfficeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
