import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion1Component } from './criterion1.component';

describe('Criterion1Component', () => {
  let component: Criterion1Component;
  let fixture: ComponentFixture<Criterion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
