import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewScholarshipDataComponent } from './add-new-scholarship-data.component';

describe('AddNewScholarshipDataComponent', () => {
  let component: AddNewScholarshipDataComponent;
  let fixture: ComponentFixture<AddNewScholarshipDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewScholarshipDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewScholarshipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
