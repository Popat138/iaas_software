import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criteria2Component } from './criteria2.component';

describe('Criteria2Component', () => {
  let component: Criteria2Component;
  let fixture: ComponentFixture<Criteria2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criteria2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criteria2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
