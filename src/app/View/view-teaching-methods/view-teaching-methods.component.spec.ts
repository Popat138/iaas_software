import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeachingMethodsComponent } from './view-teaching-methods.component';

describe('ViewTeachingMethodsComponent', () => {
  let component: ViewTeachingMethodsComponent;
  let fixture: ComponentFixture<ViewTeachingMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeachingMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeachingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
