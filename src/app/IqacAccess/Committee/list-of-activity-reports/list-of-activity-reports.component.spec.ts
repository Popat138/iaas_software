import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfActivityReportsComponent } from './list-of-activity-reports.component';

describe('ListOfActivityReportsComponent', () => {
  let component: ListOfActivityReportsComponent;
  let fixture: ComponentFixture<ListOfActivityReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfActivityReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfActivityReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
