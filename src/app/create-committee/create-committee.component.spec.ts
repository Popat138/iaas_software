import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommitteeComponent } from './create-committee.component';

describe('CreateCommitteeComponent', () => {
  let component: CreateCommitteeComponent;
  let fixture: ComponentFixture<CreateCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
