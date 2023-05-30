import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfUgToPgComponent } from './list-of-ug-to-pg.component';

describe('ListOfUgToPgComponent', () => {
  let component: ListOfUgToPgComponent;
  let fixture: ComponentFixture<ListOfUgToPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfUgToPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfUgToPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
