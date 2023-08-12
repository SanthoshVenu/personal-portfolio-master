import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ExpenseData } from '../../../shared/models/expense-data';
import { NgbdSortableHeader } from './NgbdSortableHeader';

export type SortColumn = keyof ExpenseData | '';
export type SortDirection = 'asc' | 'desc' | '';
export const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number | boolean | Date, v2: string | number | boolean | Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

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

  expenseData = this.expenseTableData;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  public onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.expenseData = this.expenseTableData;
    } else {
      this.expenseData = [...this.expenseTableData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
