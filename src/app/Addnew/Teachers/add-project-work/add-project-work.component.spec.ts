import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectWorkComponent } from './add-project-work.component';

describe('AddProjectWorkComponent', () => {
  let component: AddProjectWorkComponent;
  let fixture: ComponentFixture<AddProjectWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
