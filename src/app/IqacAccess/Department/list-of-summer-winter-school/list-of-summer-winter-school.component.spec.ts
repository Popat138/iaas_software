import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSummerWinterSchoolComponent } from './list-of-summer-winter-school.component';

describe('ListOfSummerWinterSchoolComponent', () => {
  let component: ListOfSummerWinterSchoolComponent;
  let fixture: ComponentFixture<ListOfSummerWinterSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfSummerWinterSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSummerWinterSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
