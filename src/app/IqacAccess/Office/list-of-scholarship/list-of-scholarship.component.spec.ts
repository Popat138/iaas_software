import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfScholarshipComponent } from './list-of-scholarship.component';

describe('ListOfScholarshipComponent', () => {
  let component: ListOfScholarshipComponent;
  let fixture: ComponentFixture<ListOfScholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfScholarshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfScholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
