import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfOnlineResourcesComponent } from './list-of-online-resources.component';

describe('ListOfOnlineResourcesComponent', () => {
  let component: ListOfOnlineResourcesComponent;
  let fixture: ComponentFixture<ListOfOnlineResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfOnlineResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfOnlineResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
