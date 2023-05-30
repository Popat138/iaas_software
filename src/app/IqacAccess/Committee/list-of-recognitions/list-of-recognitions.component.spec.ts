import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRecognitionsComponent } from './list-of-recognitions.component';

describe('ListOfRecognitionsComponent', () => {
  let component: ListOfRecognitionsComponent;
  let fixture: ComponentFixture<ListOfRecognitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfRecognitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfRecognitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
