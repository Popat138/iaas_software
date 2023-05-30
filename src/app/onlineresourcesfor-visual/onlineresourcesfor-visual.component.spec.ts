import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineresourcesforVisualComponent } from './onlineresourcesfor-visual.component';

describe('OnlineresourcesforVisualComponent', () => {
  let component: OnlineresourcesforVisualComponent;
  let fixture: ComponentFixture<OnlineresourcesforVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineresourcesforVisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineresourcesforVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
