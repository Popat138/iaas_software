import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBestPracticeComponent } from './edit-best-practice.component';

describe('EditBestPracticeComponent', () => {
  let component: EditBestPracticeComponent;
  let fixture: ComponentFixture<EditBestPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBestPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBestPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
