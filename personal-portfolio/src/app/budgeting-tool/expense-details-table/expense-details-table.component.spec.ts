import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetailsTableComponent } from './expense-details-table.component';

describe('ExpenseDetailsTableComponent', () => {
  let component: ExpenseDetailsTableComponent;
  let fixture: ComponentFixture<ExpenseDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
