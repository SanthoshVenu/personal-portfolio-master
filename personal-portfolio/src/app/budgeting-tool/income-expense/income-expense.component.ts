import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit {

  totalIncome!: number;
  totalExpense!: number;
  totalRemainingCash!: number;

  @Input() updatedExpense!: number;

  constructor() { }

  ngOnInit(): void {
    this.totalExpense = this.updatedExpense
  }

  public updatedIncome(event: any): void {
    this.totalIncome = event
  }
  public updatedRemainingCash(event: any): void {
    this.totalRemainingCash = event
  }


}
