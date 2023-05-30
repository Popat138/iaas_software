import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourcesVisuallyComponent } from './edit-resources-visually.component';

describe('EditResourcesVisuallyComponent', () => {
  let component: EditResourcesVisuallyComponent;
  let fixture: ComponentFixture<EditResourcesVisuallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResourcesVisuallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourcesVisuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
