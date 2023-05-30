import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRollCallListComponent } from './view-roll-call-list.component';

describe('ViewRollCallListComponent', () => {
  let component: ViewRollCallListComponent;
  let fixture: ComponentFixture<ViewRollCallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRollCallListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRollCallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
