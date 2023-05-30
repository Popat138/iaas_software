import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnewreportComponent } from './testnewreport.component';

describe('TestnewreportComponent', () => {
  let component: TestnewreportComponent;
  let fixture: ComponentFixture<TestnewreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestnewreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestnewreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
