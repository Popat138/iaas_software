import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOneTimeFormComponent } from './add-one-time-form.component';

describe('AddOneTimeFormComponent', () => {
  let component: AddOneTimeFormComponent;
  let fixture: ComponentFixture<AddOneTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOneTimeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOneTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
