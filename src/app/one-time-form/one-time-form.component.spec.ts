import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeFormComponent } from './one-time-form.component';

describe('OneTimeFormComponent', () => {
  let component: OneTimeFormComponent;
  let fixture: ComponentFixture<OneTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
