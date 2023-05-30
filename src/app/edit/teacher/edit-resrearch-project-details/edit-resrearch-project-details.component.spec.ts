import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResrearchProjectDetailsComponent } from './edit-resrearch-project-details.component';

describe('EditResrearchProjectDetailsComponent', () => {
  let component: EditResrearchProjectDetailsComponent;
  let fixture: ComponentFixture<EditResrearchProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResrearchProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResrearchProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
