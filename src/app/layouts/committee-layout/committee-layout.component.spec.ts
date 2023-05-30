import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeLayoutComponent } from './committee-layout.component';

describe('CommitteeLayoutComponent', () => {
  let component: CommitteeLayoutComponent;
  let fixture: ComponentFixture<CommitteeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
