import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOneTimeFormComponent } from './edit-one-time-form.component';

describe('EditOneTimeFormComponent', () => {
  let component: EditOneTimeFormComponent;
  let fixture: ComponentFixture<EditOneTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOneTimeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOneTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
