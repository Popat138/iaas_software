import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDetailsIlmsSoftwareComponent } from './list-of-details-ilms-software.component';

describe('ListOfDetailsIlmsSoftwareComponent', () => {
  let component: ListOfDetailsIlmsSoftwareComponent;
  let fixture: ComponentFixture<ListOfDetailsIlmsSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfDetailsIlmsSoftwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfDetailsIlmsSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
