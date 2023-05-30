import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneTimeFormComponent } from './view-one-time-form.component';

describe('ViewOneTimeFormComponent', () => {
  let component: ViewOneTimeFormComponent;
  let fixture: ComponentFixture<ViewOneTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneTimeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
