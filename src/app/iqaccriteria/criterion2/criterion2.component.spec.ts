import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion2Component } from './criterion2.component';

describe('Criterion2Component', () => {
  let component: Criterion2Component;
  let fixture: ComponentFixture<Criterion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
