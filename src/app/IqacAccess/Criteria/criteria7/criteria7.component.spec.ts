import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criteria7Component } from './criteria7.component';

describe('Criteria7Component', () => {
  let component: Criteria7Component;
  let fixture: ComponentFixture<Criteria7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criteria7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criteria7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
