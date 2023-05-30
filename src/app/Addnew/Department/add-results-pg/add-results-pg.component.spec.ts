import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultsPgComponent } from './add-results-pg.component';

describe('AddResultsPgComponent', () => {
  let component: AddResultsPgComponent;
  let fixture: ComponentFixture<AddResultsPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultsPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResultsPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
