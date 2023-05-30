import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTeachingMethodsComponent } from './list-of-teaching-methods.component';

describe('ListOfTeachingMethodsComponent', () => {
  let component: ListOfTeachingMethodsComponent;
  let fixture: ComponentFixture<ListOfTeachingMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTeachingMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTeachingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
