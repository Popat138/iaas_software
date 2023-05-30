import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeachingDetailsComponent } from './view-teaching-details.component';

describe('ViewTeachingDetailsComponent', () => {
  let component: ViewTeachingDetailsComponent;
  let fixture: ComponentFixture<ViewTeachingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeachingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeachingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
