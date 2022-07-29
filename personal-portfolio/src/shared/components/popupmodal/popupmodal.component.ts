import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseTrackerService } from '../../services/expensetrackerservice.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { IncomeSourceDetails } from '../../models/incomesourcedetails';


@Component({
  selector: 'app-popupmodal',
  templateUrl: './popupmodal.component.html',
  styleUrls: ['./popupmodal.component.scss'],
})
export class PopupModalComponent implements OnInit {
  incomeDetailsForm!: FormGroup;
  incomeSourceDetails: IncomeSourceDetails[] = [];

  constructor(
    public dialogService: MatDialog,
    private fb: FormBuilder,
    private expenseService: ExpenseTrackerService
  ) { }
  @Input() name!: string;
  @Output() updatedIncome = new EventEmitter<number>();
  //  @Output() updatedExpenses = new EventEmitter<number>();
  @Output() updatedRemainingCash = new EventEmitter<number>();
  ngOnInit(): void {
    this.incomeDetailsForm = this.fb.group({
      income: [, [Validators.required]],
      incomeSourceName: ['', Validators.required],
    });

    this.getIncomeSourceData();
  }

  public getIncomeSourceData(): void {
    this.incomeSourceDetails = [];
    this.expenseService.getAllIncomeSourcesData().subscribe((incomeSources) => {
      incomeSources.forEach((incomeSource) => {
        this.incomeSourceDetails.push(incomeSource);
      });
    });
    console.log(this.incomeSourceDetails);
  }
  public OnSubmitNewIncomeForm(): void {
    if (this.incomeDetailsForm.valid) {
      const date = new Date();
      const monthNames = [
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
      let incomeSourceData = {};
      incomeSourceData = {
        budgetName: "SV" + monthNames[date.getMonth()] + "/" + date.getFullYear(),
        incomeSourceName: this.incomeDetailsForm.value['incomeSourceName'],
        sourceId: this.incomeSourceDetails.find(
          (x) => x.incomeSource == this.incomeDetailsForm.value['incomeSourceName']
        )?.incomeId,
        newIncome: this.incomeDetailsForm.value['income'],
        currentExpenses: 0,
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
      };
      console.log(incomeSourceData);
      this.incomeDetailsForm.reset();
    }
  }

  public saveIncomeDetails(incomeSourceData: any): void {
    this.expenseService.updateIncomeData(incomeSourceData).subscribe((budgetDetails) => {
      this.updatedIncome.emit(budgetDetails.totalIncome);
      //this.updatedExpenses.emit(budgetDetails.totalExpenses);
      this.updatedRemainingCash.emit(budgetDetails.totalRemainingCash);
    });
  }
}
