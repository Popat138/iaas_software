import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternshipDetailsComponent } from './add-internship-details';

describe('AddInternshipDetailsComponent', () => {
  let component: AddInternshipDetailsComponent;
  let fixture: ComponentFixture<AddInternshipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInternshipDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInternshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
