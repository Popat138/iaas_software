import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRollCallListComponent } from './get-roll-call-list.component';

describe('GetRollCallListComponent', () => {
  let component: GetRollCallListComponent;
  let fixture: ComponentFixture<GetRollCallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRollCallListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRollCallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
