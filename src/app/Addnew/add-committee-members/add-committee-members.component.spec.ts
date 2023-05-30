import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommitteeMembersComponent } from './add-committee-members.component';

describe('AddCommitteeMembersComponent', () => {
  let component: AddCommitteeMembersComponent;
  let fixture: ComponentFixture<AddCommitteeMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommitteeMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommitteeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
