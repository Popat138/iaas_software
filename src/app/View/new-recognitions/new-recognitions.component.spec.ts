import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecognitionsComponent } from './new-recognitions.component';

describe('NewRecognitionsComponent', () => {
  let component: NewRecognitionsComponent;
  let fixture: ComponentFixture<NewRecognitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecognitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecognitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
