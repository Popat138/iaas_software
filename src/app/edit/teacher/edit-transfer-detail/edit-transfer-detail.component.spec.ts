import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransferDetailComponent } from './edit-transfer-detail.component';

describe('EditTransferDetailComponent', () => {
  let component: EditTransferDetailComponent;
  let fixture: ComponentFixture<EditTransferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransferDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
