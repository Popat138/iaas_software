import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingMethodsComponent } from './teaching-methods.component';

describe('TeachingMethodsComponent', () => {
  let component: TeachingMethodsComponent;
  let fixture: ComponentFixture<TeachingMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
