import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnlineResourcesComponent } from './add-online-resources.component';

describe('AddOnlineResourcesComponent', () => {
  let component: AddOnlineResourcesComponent;
  let fixture: ComponentFixture<AddOnlineResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnlineResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnlineResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
