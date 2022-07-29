import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddincomedetailsComponent } from './addincomedetails.component';

describe('AddincomedetailsComponent', () => {
  let component: AddincomedetailsComponent;
  let fixture: ComponentFixture<AddincomedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddincomedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddincomedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
