import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectWorkComponent } from './view-project-work.component';

describe('ViewProjectWorkComponent', () => {
  let component: ViewProjectWorkComponent;
  let fixture: ComponentFixture<ViewProjectWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
