import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlmsInformationComponent } from './ilms-information.component';

describe('IlmsInformationComponent', () => {
  let component: IlmsInformationComponent;
  let fixture: ComponentFixture<IlmsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlmsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IlmsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
