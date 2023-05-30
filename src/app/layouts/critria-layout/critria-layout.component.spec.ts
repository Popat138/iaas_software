import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CritriaLayoutComponent } from './critria-layout.component';

describe('CritriaLayoutComponent', () => {
  let component: CritriaLayoutComponent;
  let fixture: ComponentFixture<CritriaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CritriaLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CritriaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
