import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInternalAssesmentComponent } from './edit-internal-assesment.component';

describe('EditInternalAssesmentComponent', () => {
  let component: EditInternalAssesmentComponent;
  let fixture: ComponentFixture<EditInternalAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInternalAssesmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInternalAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
