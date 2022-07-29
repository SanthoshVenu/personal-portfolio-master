import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ExpenseTrackerService } from '../../../shared/services/expensetrackerservice.service';
import { ExpenseData } from '../../../shared/models/expense-data';
import { Category } from '../../../shared/models/category';
import { Subcategory } from '../../../shared/models/subcategory';
import { Paymentmode } from '../../../shared/models/paymentmode';

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

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseTrackerService
  ) { }
  ngOnInit(): void {
    this.expenseDataForm = this.fb.group({
      expenseName: ['Name', [Validators.required]],
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
    this.getCategoryData();
    this.getModeOfPaymentData();
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
  onSubmitForm(expenseFormDate: ExpenseData) {
    if (this.expenseDataForm.valid) {
      let expenseDataObject = {};

      expenseDataObject = {
        expenseInfoId: this.expenseDataForm.value['expenseName'],
        userName: this.expenseDataForm.value['userName'],
        modeOfPayment: this.expenseDataForm.value['modeOfPayment'],
        category: this.expenseDataForm.value['categoryName'],
        subCategory: this.expenseDataForm.value['subCategoryName'],
        cost: this.expenseDataForm.value['cost'],
        date: this.expenseDataForm.value['spendingDate'],
        description: this.expenseDataForm.value['description'],
        isFavourite: this.expenseDataForm.value['isFavourite'],
        isActive: this.expenseDataForm.value['isActive'],
      };
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
      let expenseData = {};
      expenseData = {
        budgetName: "",
        incomeSourceName: "",
        sourceId: 0,
        newIncome: 0,
        currentExpenses: this.expenseDataForm.value['cost'],
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),

      };
      this.expenseService.updateExpenseData(expenseData).subscribe((budgetDetails) => {
        this.updatedExpense = budgetDetails.totalExpenses;
      });

      // Need to add "Expense Added Successfully"
      this.expenseService
        .saveExpenseDate(expenseDataObject)
        .subscribe((data) => {
        });
      this.expenseDataForm.reset();
    }
  }
}
