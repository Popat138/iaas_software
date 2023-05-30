import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion4Component } from './criterion4.component';

describe('Criterion4Component', () => {
  let component: Criterion4Component;
  let fixture: ComponentFixture<Criterion4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
