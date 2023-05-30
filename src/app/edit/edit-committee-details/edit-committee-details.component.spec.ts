import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommitteeDetailsComponent } from './edit-committee-details.component';

describe('EditCommitteeDetailsComponent', () => {
  let component: EditCommitteeDetailsComponent;
  let fixture: ComponentFixture<EditCommitteeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommitteeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommitteeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
