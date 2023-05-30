import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBestPracticesComponent } from './list-of-best-practices.component';

describe('ListOfBestPracticesComponent', () => {
  let component: ListOfBestPracticesComponent;
  let fixture: ComponentFixture<ListOfBestPracticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBestPracticesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
