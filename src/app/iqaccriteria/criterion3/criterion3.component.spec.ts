import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion3Component } from './criterion3.component';

describe('Criterion3Component', () => {
  let component: Criterion3Component;
  let fixture: ComponentFixture<Criterion3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
