import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachingDetailsComponent } from './add-teaching-details.component';

describe('AddTeachingDetailsComponent', () => {
  let component: AddTeachingDetailsComponent;
  let fixture: ComponentFixture<AddTeachingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeachingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeachingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
