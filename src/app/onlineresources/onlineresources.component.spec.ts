import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineresourcesComponent } from './onlineresources.component';

describe('OnlineresourcesComponent', () => {
  let component: OnlineresourcesComponent;
  let fixture: ComponentFixture<OnlineresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineresourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
