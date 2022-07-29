import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseTrackerService } from '../../../shared/services/expensetrackerservice.service'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { IncomeSourceDetails } from '../../../shared/models/incomesourcedetails'

@Component({
  selector: 'app-addincomedetails',
  templateUrl: './addincomedetails.component.html',
  styleUrls: ['./addincomedetails.component.scss']
})
export class AddIncomedetailsComponent implements OnInit {
  incomeDetailsForm!: FormGroup;
  incomeSourceDetails: IncomeSourceDetails[] = [];

  constructor(
    public dialogService: MatDialog,
    private fb: FormBuilder,
    private expenseService: ExpenseTrackerService
  ) { }
  @Input() name!: string;
  ngOnInit(): void {
    this.incomeDetailsForm = this.fb.group({
      income: [0, [Validators.required]],
      incomeSourceName: ["", Validators.required],
      month: [" ", Validators.required],
      year: [2022, Validators.required]
    })

    this.getIncomeSourceData();
  }

  public getIncomeSourceData(): void {
    this.incomeSourceDetails = [];
    this.expenseService.getAllIncomeSourcesData().subscribe(incomeSources => {
      incomeSources.forEach(incomeSource => {
        this.incomeSourceDetails.push(incomeSource);
      })
    })
  }

}
