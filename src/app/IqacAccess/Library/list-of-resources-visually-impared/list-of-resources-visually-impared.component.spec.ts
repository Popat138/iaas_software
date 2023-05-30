import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResourcesVisuallyImparedComponent } from './list-of-resources-visually-impared.component';

describe('ListOfResourcesVisuallyImparedComponent', () => {
  let component: ListOfResourcesVisuallyImparedComponent;
  let fixture: ComponentFixture<ListOfResourcesVisuallyImparedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfResourcesVisuallyImparedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResourcesVisuallyImparedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
