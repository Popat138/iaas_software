import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersPresentedConferenceComponent } from './papers-presented-conference.component';

describe('PapersPresentedConferenceComponent', () => {
  let component: PapersPresentedConferenceComponent;
  let fixture: ComponentFixture<PapersPresentedConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PapersPresentedConferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PapersPresentedConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
