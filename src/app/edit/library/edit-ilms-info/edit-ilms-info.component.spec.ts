import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIlmsInfoComponent } from './edit-ilms-info.component';

describe('EditIlmsInfoComponent', () => {
  let component: EditIlmsInfoComponent;
  let fixture: ComponentFixture<EditIlmsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIlmsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIlmsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
