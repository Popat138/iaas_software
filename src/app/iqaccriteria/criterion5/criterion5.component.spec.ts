import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criterion5Component } from './criterion5.component';

describe('Criterion5Component', () => {
  let component: Criterion5Component;
  let fixture: ComponentFixture<Criterion5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criterion5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criterion5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
