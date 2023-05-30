import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollCallDataComponent } from './roll-call-data.component';

describe('RollCallDataComponent', () => {
  let component: RollCallDataComponent;
  let fixture: ComponentFixture<RollCallDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollCallDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollCallDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
