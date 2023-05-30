import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqactestreportComponent } from './iqactestreport.component';

describe('IqactestreportComponent', () => {
  let component: IqactestreportComponent;
  let fixture: ComponentFixture<IqactestreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IqactestreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IqactestreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
