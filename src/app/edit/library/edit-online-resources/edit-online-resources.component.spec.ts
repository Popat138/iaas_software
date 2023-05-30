import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnlineResourcesComponent } from './edit-online-resources.component';

describe('EditOnlineResourcesComponent', () => {
  let component: EditOnlineResourcesComponent;
  let fixture: ComponentFixture<EditOnlineResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOnlineResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOnlineResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
