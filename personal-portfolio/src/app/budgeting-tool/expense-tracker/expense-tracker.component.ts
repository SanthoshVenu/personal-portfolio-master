import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormGroupDirective } from '@angular/forms';
import { ExpenseTrackerService } from '../../../shared/services/expensetrackerservice.service';
import { ExpenseData } from '../../../shared/models/expense-data';
import { Category } from '../../../shared/models/category';
import { Subcategory } from '../../../shared/models/subcategory';
import { Paymentmode } from '../../../shared/models/paymentmode';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss'],
})
export class ExpenseTrackerComponent implements OnInit {
  expenseDataForm!: FormGroup;
  categoriesData: Category[] = [];
  subCategories: string[] = [];
  selectedCategoryId?: number = 0;
  modeOfPayments: Paymentmode[] = [];
  expenseTrackerModal: any = {};
  updatedExpense: number = 0;
  currentSelectedMonth!: string;
  currentSelectedYear!: number;
  expenseTableUpdatedData: any;

  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseTrackerService
  ) { }

  ngOnInit(): void {
    this.expenseDataForm = this.fb.group({
      expenseName: ['Name'],
      userName: ['Santhosh Venugopal'],
      modeOfPayment: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      subCategoryName: ['', [Validators.required]],
      cost: [0, [Validators.required]],
      spendingDate: [Date, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      isFavourite: [false],
      isActive: [true],
    });
    var date = new Date();
    this.currentSelectedMonth = this.monthNames[date.getMonth()];
    this.currentSelectedYear = date.getFullYear();
    this.getCategoryData();
    this.getModeOfPaymentData();
    this.updatedExpenseData(this.currentSelectedMonth, this.currentSelectedYear);
  }

  public getCategoryData(): void {
    this.expenseService.getAllCategoryData().subscribe((categories) => {
      categories.forEach((category) => {
        this.categoriesData.push(category);
      });
    });
  }
  public getSubCategoryDataByCategoryId(selectedCategoryName: any): void {
    this.subCategories = [];
    this.selectedCategoryId = this.categoriesData.find(
      (category) => category.categoryName === selectedCategoryName
    )?.categoryId;
    this.expenseService
      .getAllSubCategoryDataByCategoryId(this.selectedCategoryId)
      .subscribe((subCategories) => {
        subCategories.forEach((subcategory) => {
          this.subCategories.push(subcategory.trim());
        });
      });
  }

  public getModeOfPaymentData(): void {
    this.expenseService.getAllModeOfPaymentData().subscribe((paymentModes) => {
      paymentModes.forEach((paymentMode) => {
        this.modeOfPayments.push(paymentMode);
      });
    });
  }
  public currentMonthYear(event: any) {
    this.currentSelectedMonth = event.currentMonth.toString();
    this.currentSelectedYear = event.currentYear;
    this.expenseDataForm.reset();
  }
  public minMaxDateConfiguration(event: any) {
    this.minDate = event.minDate;
    this.maxDate = event.maxDate;
    this.expenseDataForm.reset();
    this.updatedExpenseData(this.currentSelectedMonth, this.currentSelectedYear);
  }
  public onSubmitForm(expenseFormDate: ExpenseData, formDirective: FormGroupDirective) {
    if (this.expenseDataForm.valid) {
      let expenseDataObject = {};

      expenseDataObject = {
        expenseInfoId: this.expenseDataForm.value['expenseName'],
        userName: this.expenseDataForm.value['userName'],
        modeOfPayment: this.expenseDataForm.value['modeOfPayment'],
        category: this.expenseDataForm.value['categoryName'],
        subCategory: this.expenseDataForm.value['subCategoryName'],
        cost: this.expenseDataForm.value['cost'],
        month: this.currentSelectedMonth,
        year: this.currentSelectedYear,
        date: this.expenseDataForm.value['spendingDate'],
        description: this.expenseDataForm.value['description'],
        isFavourite: this.expenseDataForm.value['isFavourite'],
        isActive: this.expenseDataForm.value['isActive'],
      };
      const date = new Date();
      if (this.currentSelectedMonth !== null && this.currentSelectedMonth !== "" && this.currentSelectedMonth !== undefined) {

        let expenseData = {};
        expenseData = {
          budgetName: "",
          incomeSourceName: "",
          sourceId: 0,
          newIncome: 0,
          currentExpenses: this.expenseDataForm.value['cost'],
          month: this.currentSelectedMonth,
          year: this.currentSelectedYear,

        };

        this.expenseService.updateExpenseData(expenseData).subscribe((budgetDetails) => {
          this.updatedExpense = budgetDetails.totalExpenses;
        });

        //   this.expenseDataForm.updateValueAndValidity();
        // Need to add "Expense Added Successfully"
        this.expenseService.saveExpenseDate(expenseDataObject).pipe(switchMap(data => {
          return this.expenseService.getAllExpenseData()
        })).subscribe(allExpenseData => {
          this.expenseTableUpdatedData = allExpenseData.filter(x => x.month === this.currentSelectedMonth && x.year === this.currentSelectedYear);
        })
        // this.updatedExpenseData(this.currentSelectedMonth, this.currentSelectedYear);
        this.expenseDataForm.reset();
        formDirective.resetForm();
      }
    }

  }

  public updatedExpenseData(selectedMonth: string, selectedYear: number) {
    this.expenseService.getAllExpenseData().subscribe(data => {
      this.expenseTableUpdatedData = data.filter(x => x.month === selectedMonth && x.year === selectedYear);
      console.log(this.expenseTableUpdatedData);
    })
    // console.log(`this.expenseTableUpdatedData == ${this.expenseTableUpdatedData}`);
    // if (this.expenseTableUpdatedData === undefined) {
    //   this.updatedExpenseData(this.currentSelectedMonth, this.currentSelectedYear);
    // }
  }
  public formReset(formDirective: FormGroupDirective) {
    this.expenseDataForm.reset();
    formDirective.resetForm();

  }
}
