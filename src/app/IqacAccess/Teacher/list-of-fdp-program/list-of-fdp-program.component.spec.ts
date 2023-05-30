import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFdpComponent } from './list-of-fdp-program.component';

describe('ListOfApprovalComponent', () => {
  let component: ListOfFdpComponent;
  let fixture: ComponentFixture<ListOfFdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
