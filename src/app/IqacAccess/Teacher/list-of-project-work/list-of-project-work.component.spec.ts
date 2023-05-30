import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProjectWorkComponent } from './list-of-project-work.component';

describe('ListOfProjectWorkComponent', () => {
  let component: ListOfProjectWorkComponent;
  let fixture: ComponentFixture<ListOfProjectWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfProjectWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfProjectWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
