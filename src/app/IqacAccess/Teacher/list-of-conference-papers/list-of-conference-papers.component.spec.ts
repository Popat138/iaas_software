import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfConferencePapersComponent } from './list-of-conference-papers.component';

describe('ListOfConferencePapersComponent', () => {
  let component: ListOfConferencePapersComponent;
  let fixture: ComponentFixture<ListOfConferencePapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfConferencePapersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfConferencePapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
