import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnlineResourcesVisuallyImparedComponent } from './add-online-resources-visually-impared.component';

describe('AddOnlineResourcesVisuallyImparedComponent', () => {
  let component: AddOnlineResourcesVisuallyImparedComponent;
  let fixture: ComponentFixture<AddOnlineResourcesVisuallyImparedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnlineResourcesVisuallyImparedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnlineResourcesVisuallyImparedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
