import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoPoAttainmentComponent } from './co-po-attainment.component';

describe('CoPoAttainmentComponent', () => {
  let component: CoPoAttainmentComponent;
  let fixture: ComponentFixture<CoPoAttainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoPoAttainmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoPoAttainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
