import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddscreenshotComponent } from './addscreenshot.component';

describe('AddscreenshotComponent', () => {
  let component: AddscreenshotComponent;
  let fixture: ComponentFixture<AddscreenshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddscreenshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddscreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
