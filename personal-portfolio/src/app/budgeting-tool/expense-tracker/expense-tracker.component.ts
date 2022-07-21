import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.scss']
})
export class ExpenseTrackerComponent implements OnInit {

  expenseDataForm!: FormGroup;
  categories = ["HouseHold", "Food", "Health"];
  subCategories = ["HouseHold", "Food", "Health"];
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.expenseDataForm = this.fb.group({
      expenseName: ['',[Validators.required]],
      accountName: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      subCategoryName: ['', [Validators.required]],
      income_or_expense: ['',[Validators.required]],
      cost: [0, [Validators.required]],
      description: ['', [Validators.required]],
      spendingDate: [Date,[Validators.required]],
      isActive:[Boolean]
})
  }

}
