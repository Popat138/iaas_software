import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultsUgComponent } from './add-results-ug.component';

describe('AddResultsUgComponent', () => {
  let component: AddResultsUgComponent;
  let fixture: ComponentFixture<AddResultsUgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultsUgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResultsUgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
