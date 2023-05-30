import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHigherEducationComponent } from './add-higher-education.component';

describe('AddHigherEducationComponent', () => {
  let component: AddHigherEducationComponent;
  let fixture: ComponentFixture<AddHigherEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHigherEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHigherEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
