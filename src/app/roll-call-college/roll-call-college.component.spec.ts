import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollCallCollegeComponent } from './roll-call-college.component';

describe('RollCallCollegeComponent', () => {
  let component: RollCallCollegeComponent;
  let fixture: ComponentFixture<RollCallCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollCallCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollCallCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
