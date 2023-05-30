import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachingDetailsComponent } from './edit-teaching-details.component';

describe('EditTeachingDetailsComponent', () => {
  let component: EditTeachingDetailsComponent;
  let fixture: ComponentFixture<EditTeachingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeachingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeachingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
