import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPapersPresentedComponent } from './add-papers-presented.component';

describe('AddPapersPresentedComponent', () => {
  let component: AddPapersPresentedComponent;
  let fixture: ComponentFixture<AddPapersPresentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPapersPresentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPapersPresentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
