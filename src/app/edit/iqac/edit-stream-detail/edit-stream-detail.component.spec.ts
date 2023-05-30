import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreamDetailComponent } from './edit-stream-detail.component';

describe('EditStreamDetailComponent', () => {
  let component: EditStreamDetailComponent;
  let fixture: ComponentFixture<EditStreamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStreamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStreamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
