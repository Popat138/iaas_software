import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipDataComponent } from './scholarship-data.component';

describe('ScholarshipDataComponent', () => {
  let component: ScholarshipDataComponent;
  let fixture: ComponentFixture<ScholarshipDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
