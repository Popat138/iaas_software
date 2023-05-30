import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRecognitionsComponent } from './add-new-recognitions.component';

describe('AddNewRecognitionsComponent', () => {
  let component: AddNewRecognitionsComponent;
  let fixture: ComponentFixture<AddNewRecognitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRecognitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRecognitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
