import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaasoutStudentsComponent } from './edit-paasout-students.component';

describe('EditPaasoutStudentsComponent', () => {
  let component: EditPaasoutStudentsComponent;
  let fixture: ComponentFixture<EditPaasoutStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaasoutStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaasoutStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
