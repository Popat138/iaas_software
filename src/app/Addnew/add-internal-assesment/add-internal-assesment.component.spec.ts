import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternalAssesmentComponent } from './add-internal-assesment.component';

describe('AddInternalAssesmentComponent', () => {
  let component: AddInternalAssesmentComponent;
  let fixture: ComponentFixture<AddInternalAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInternalAssesmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInternalAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
