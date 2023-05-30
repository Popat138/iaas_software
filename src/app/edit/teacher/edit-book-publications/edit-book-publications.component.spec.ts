import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookPublicationsComponent } from './edit-book-publications.component';

describe('EditBookPublicationsComponent', () => {
  let component: EditBookPublicationsComponent;
  let fixture: ComponentFixture<EditBookPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
