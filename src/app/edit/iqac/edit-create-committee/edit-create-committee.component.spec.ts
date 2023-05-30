import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateCommitteeComponent } from './edit-create-committee.component';

describe('EditCreateCommitteeComponent', () => {
  let component: EditCreateCommitteeComponent;
  let fixture: ComponentFixture<EditCreateCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
