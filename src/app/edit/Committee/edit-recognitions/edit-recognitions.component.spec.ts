import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecognitionsComponent } from './edit-recognitions.component';

describe('EditRecognitionsComponent', () => {
  let component: EditRecognitionsComponent;
  let fixture: ComponentFixture<EditRecognitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecognitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecognitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
