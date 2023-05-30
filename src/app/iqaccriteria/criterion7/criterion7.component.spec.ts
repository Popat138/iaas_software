import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion7Component } from './criterion7.component';

describe('Criterion7Component', () => {
  let component: Criterion7Component;
  let fixture: ComponentFixture<Criterion7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
