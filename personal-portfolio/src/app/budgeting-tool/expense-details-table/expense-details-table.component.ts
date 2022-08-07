import { Component, OnInit, Input } from '@angular/core';
import { ExpenseData } from '../../../shared/models/expense-data';

@Component({
  selector: 'app-expense-details-table',
  templateUrl: './expense-details-table.component.html',
  styleUrls: ['./expense-details-table.component.scss']
})
export class ExpenseDetailsTableComponent implements OnInit {

  @Input() expenseTableData: ExpenseData[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
