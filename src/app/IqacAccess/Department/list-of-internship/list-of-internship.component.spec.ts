import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfInternshipComponent } from './list-of-internship.component';

describe('ListOfInternshipComponent', () => {
  let component: ListOfInternshipComponent;
  let fixture: ComponentFixture<ListOfInternshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfInternshipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
