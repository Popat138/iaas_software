import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaperPresentedComponent } from './edit-paper-presented.component';

describe('EditPaperPresentedComponent', () => {
  let component: EditPaperPresentedComponent;
  let fixture: ComponentFixture<EditPaperPresentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaperPresentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaperPresentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
