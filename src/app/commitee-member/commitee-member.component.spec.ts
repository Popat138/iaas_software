import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommiteeMemberComponent } from './commitee-member.component';

describe('CommiteeMemberComponent', () => {
  let component: CommiteeMemberComponent;
  let fixture: ComponentFixture<CommiteeMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommiteeMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommiteeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
