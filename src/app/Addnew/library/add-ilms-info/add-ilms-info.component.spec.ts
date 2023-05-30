import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIlmsInfoComponent } from './add-ilms-info.component';

describe('AddIlmsInfoComponent', () => {
  let component: AddIlmsInfoComponent;
  let fixture: ComponentFixture<AddIlmsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIlmsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIlmsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
