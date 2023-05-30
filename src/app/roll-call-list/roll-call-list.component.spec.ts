import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollCallListComponent } from './roll-call-list.component';

describe('RollCallListComponent', () => {
  let component: RollCallListComponent;
  let fixture: ComponentFixture<RollCallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollCallListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollCallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
