import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResultUgComponent } from './edit-result-ug.component';

describe('EditResultUgComponent', () => {
  let component: EditResultUgComponent;
  let fixture: ComponentFixture<EditResultUgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResultUgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResultUgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
