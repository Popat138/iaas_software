import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHigherEduComponent } from './edit-higher-edu.component';

describe('EditHigherEduComponent', () => {
  let component: EditHigherEduComponent;
  let fixture: ComponentFixture<EditHigherEduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHigherEduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHigherEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
