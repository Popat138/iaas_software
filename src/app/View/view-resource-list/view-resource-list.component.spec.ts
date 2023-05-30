import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResourceListComponent } from './view-resource-list.component';

describe('ViewResourceListComponent', () => {
  let component: ViewResourceListComponent;
  let fixture: ComponentFixture<ViewResourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResourceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
