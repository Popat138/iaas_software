import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectWorkComponent } from './edit-project-work.component';

describe('EditProjectWorkComponent', () => {
  let component: EditProjectWorkComponent;
  let fixture: ComponentFixture<EditProjectWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
