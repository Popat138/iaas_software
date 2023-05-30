import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbestpracticeComponent } from './reportbestpractice.component';

describe('ReportbestpracticeComponent', () => {
  let component: ReportbestpracticeComponent;
  let fixture: ComponentFixture<ReportbestpracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbestpracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbestpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
