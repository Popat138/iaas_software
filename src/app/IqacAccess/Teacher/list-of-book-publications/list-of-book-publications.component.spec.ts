import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBookPublicationsComponent } from './list-of-book-publications.component';

describe('ListOfBookPublicationsComponent', () => {
  let component: ListOfBookPublicationsComponent;
  let fixture: ComponentFixture<ListOfBookPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBookPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBookPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
