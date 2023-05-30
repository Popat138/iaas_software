import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RarebooksComponent } from './rarebooks.component';

describe('RarebooksComponent', () => {
  let component: RarebooksComponent;
  let fixture: ComponentFixture<RarebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RarebooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RarebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
