import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRollCallDataComponent } from './edit-roll-call-data.component';

describe('EditRollCallDataComponent', () => {
  let component: EditRollCallDataComponent;
  let fixture: ComponentFixture<EditRollCallDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRollCallDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRollCallDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
