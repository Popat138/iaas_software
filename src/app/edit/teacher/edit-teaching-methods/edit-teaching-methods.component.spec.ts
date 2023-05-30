import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachingMethodsComponent } from './edit-teaching-methods.component';

describe('EditTeachingMethodsComponent', () => {
  let component: EditTeachingMethodsComponent;
  let fixture: ComponentFixture<EditTeachingMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeachingMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeachingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
