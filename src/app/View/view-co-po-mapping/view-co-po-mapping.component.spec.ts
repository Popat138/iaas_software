import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoPoMappingComponent } from './view-co-po-mapping.component';

describe('ViewCoPoMappingComponent', () => {
  let component: ViewCoPoMappingComponent;
  let fixture: ComponentFixture<ViewCoPoMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoPoMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoPoMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
