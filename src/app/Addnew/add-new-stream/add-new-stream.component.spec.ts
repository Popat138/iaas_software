import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStreamComponent } from './add-new-stream.component';

describe('AddNewStreamComponent', () => {
  let component: AddNewStreamComponent;
  let fixture: ComponentFixture<AddNewStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
