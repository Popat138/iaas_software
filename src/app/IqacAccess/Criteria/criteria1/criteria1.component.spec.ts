import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criteria1Component } from './criteria1.component';

describe('Criteria1Component', () => {
  let component: Criteria1Component;
  let fixture: ComponentFixture<Criteria1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criteria1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criteria1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
