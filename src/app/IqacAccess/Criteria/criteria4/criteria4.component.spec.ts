import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Criteria4Component } from './criteria4.component';

describe('Criteria4Component', () => {
  let component: Criteria4Component;
  let fixture: ComponentFixture<Criteria4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Criteria4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Criteria4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
