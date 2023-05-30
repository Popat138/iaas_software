import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCommitteeComponent } from './add-new-committee.component';

describe('AddNewCommitteeComponent', () => {
  let component: AddNewCommitteeComponent;
  let fixture: ComponentFixture<AddNewCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
