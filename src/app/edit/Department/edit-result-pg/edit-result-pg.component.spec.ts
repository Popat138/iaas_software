import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResultPgComponent } from './edit-result-pg.component';

describe('EditResultPgComponent', () => {
  let component: EditResultPgComponent;
  let fixture: ComponentFixture<EditResultPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResultPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResultPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
