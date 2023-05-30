import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqacHelpComponent } from './iqac-help.component';

describe('IqacHelpComponent', () => {
  let component: IqacHelpComponent;
  let fixture: ComponentFixture<IqacHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IqacHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IqacHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
