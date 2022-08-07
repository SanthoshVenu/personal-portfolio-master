import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseTrackerService } from '../../../shared/services/expensetrackerservice.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit {

  totalIncome: number = 0;
  totalExpense!: number;
  totalRemainingCash!: number;
  monthYearForm!: FormGroup;
  selectedMonth!: string;
  selectedYear!: number;
  minDate!: Date;
  maxDate!: Date;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  @Input() updatedExpense!: number;
  @Output() currentMonthYear = new EventEmitter<{ currentMonth: string, currentYear: number }>();
  @Output() minMaxDateRange = new EventEmitter<{ minDate: Date, maxDate: Date }>();
  totIncomeExpense$!: Observable<string[]>
  constructor(private expenseService: ExpenseTrackerService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    var date = new Date();
    this.monthYearForm = this.fb.group({
      month: [this.monthNames[date.getMonth()], Validators.required],
      year: [2022, [Validators.required]]
    })
    this.selectedMonth = this.monthNames[date.getMonth()];
    this.totalExpense = this.updatedExpense;


  }

  public updatedIncome(event: any): void {
    this.totalIncome = event
  }
  public updatedRemainingCash(event: any): void {
    this.totalRemainingCash = event
  }

  public totIncomeExpenseObservable(month: string, year: number) {
    return this.expenseService.getTotalIncomeandExpenses(month, year);
  }
  public onSubmitForm(event: any): void {
    if (this.monthYearForm.valid && this.monthYearForm.value["month"] !== undefined) {
      this.selectedMonth = this.monthYearForm.value["month"];
      this.selectedYear = this.monthYearForm.value["year"];
      this.expenseService.getTotalIncomeandExpenses(this.selectedMonth, this.selectedYear).subscribe(data => {
        if (data.length !== 0) {
          this.totalIncome = data[0];
          this.updatedExpense = data[1];
        }
        else {
          this.totalIncome = 0;
          this.totalExpense = 0;
        }

      })
      this.currentMonthYear.emit({ currentMonth: this.selectedMonth, currentYear: this.selectedYear });
      this.minMaxDateConfiguration();

    }
    else {
      alert("Please Select Month")
    }

  }
  public minMaxDateConfiguration() {
    var date = new Date();
    this.minDate = new Date(date.getFullYear(), this.monthNames.indexOf(this.selectedMonth), 1);
    this.maxDate = new Date(date.getFullYear(), this.monthNames.indexOf(this.selectedMonth) + 1, 0);
    this.minMaxDateRange.emit({ minDate: this.minDate, maxDate: this.maxDate });
  }

}
