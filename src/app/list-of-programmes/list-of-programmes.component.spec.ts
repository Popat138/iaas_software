import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProgrammesComponent } from './list-of-programmes.component';

describe('ListOfProgrammesComponent', () => {
  let component: ListOfProgrammesComponent;
  let fixture: ComponentFixture<ListOfProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfProgrammesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
