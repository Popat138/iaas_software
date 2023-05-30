import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportOfEventComponent } from './edit-report-of-event.component';

describe('EditReportOfEventComponent', () => {
  let component: EditReportOfEventComponent;
  let fixture: ComponentFixture<EditReportOfEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportOfEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportOfEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
