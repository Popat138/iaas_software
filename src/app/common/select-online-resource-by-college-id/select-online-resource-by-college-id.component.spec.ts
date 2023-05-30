import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOnlineResourceByCollegeIdComponent } from './select-online-resource-by-college-id.component';

describe('SelectOnlineResourceByCollegeIdComponent', () => {
  let component: SelectOnlineResourceByCollegeIdComponent;
  let fixture: ComponentFixture<SelectOnlineResourceByCollegeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOnlineResourceByCollegeIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOnlineResourceByCollegeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
