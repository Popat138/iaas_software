import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criteria5Component } from './criteria5.component';

describe('Criteria5Component', () => {
  let component: Criteria5Component;
  let fixture: ComponentFixture<Criteria5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criteria5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criteria5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
