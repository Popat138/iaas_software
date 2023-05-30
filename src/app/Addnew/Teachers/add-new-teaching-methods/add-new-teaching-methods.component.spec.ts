import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTeachingMethodsComponent } from './add-new-teaching-methods.component';

describe('AddNewTeachingMethodsComponent', () => {
  let component: AddNewTeachingMethodsComponent;
  let fixture: ComponentFixture<AddNewTeachingMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTeachingMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTeachingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
