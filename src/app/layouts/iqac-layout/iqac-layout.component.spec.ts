import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqacLayoutComponent } from './iqac-layout.component';

describe('IqacLayoutComponent', () => {
  let component: IqacLayoutComponent;
  let fixture: ComponentFixture<IqacLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IqacLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IqacLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
