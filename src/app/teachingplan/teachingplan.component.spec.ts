import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingplanComponent } from './teachingplan.component';

describe('TeachingplanComponent', () => {
  let component: TeachingplanComponent;
  let fixture: ComponentFixture<TeachingplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
