import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion6Component } from './criterion6.component';

describe('Criterion6Component', () => {
  let component: Criterion6Component;
  let fixture: ComponentFixture<Criterion6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
