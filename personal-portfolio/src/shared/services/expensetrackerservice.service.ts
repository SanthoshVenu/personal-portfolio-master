import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ExpenseData } from '../models/expense-data';
import { Category } from '../models/category';
import { Paymentmode } from '../models/paymentmode';
import { IncomeSourceDetails } from '../models/incomesourcedetails';
import { Incomedetails } from '../models/incomedetails'
import { Budgetdetails } from '../models/budgetdetails'


@Injectable({
  providedIn: 'root'
})
export class ExpenseTrackerService {

  apiCategoryURL = "https://localhost:44351/api/Category";
  apiExpenseTrackerURL = "https://localhost:44351/api/ExpenseTracker";
  apiIncomeDetailsURL = "https://localhost:44351/api/Income";

  constructor(private http: HttpClient) { }

  httpOptions = {
    header: new HttpHeaders(
      { 'Content-Type': 'application/json', }),
  };

  // Expense Tracker Api Calls
  getAllExpenseData(): Observable<ExpenseData[]> {
    return this.http.get<ExpenseData[]>(this.apiExpenseTrackerURL + '/expenses-data')
      .pipe(retry(1), catchError(this.handleError));
  }

  saveExpenseDate(expenseData: any): Observable<ExpenseData[]> {
    console.table(expenseData);
    return this.http.post<ExpenseData[]>(this.apiExpenseTrackerURL, JSON.stringify(expenseData), { "headers": this.httpOptions.header })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Category Api Calls
  getAllCategoryData(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiCategoryURL + "/category-data")
      .pipe(retry(1), catchError(this.handleError));
  }
  getAllSubCategoryDataByCategoryId(categoryId: number | undefined): Observable<string[]> {
    console.group(`From Service ${categoryId}`)
    return this.http.get<string[]>(this.apiCategoryURL + "/subcategory-data/" + categoryId)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllModeOfPaymentData(): Observable<Paymentmode[]> {
    return this.http.get<Paymentmode[]>(this.apiCategoryURL + "/account-data")
      .pipe(retry(1), catchError(this.handleError))

  }

  // IncomeSource services

  getAllIncomeSourcesData(): Observable<IncomeSourceDetails[]> {
    return this.http.get<IncomeSourceDetails[]>(this.apiIncomeDetailsURL + "/income-source")
      .pipe(retry(1), catchError(this.handleError))
  }

  updateIncomeData(incomeSourceData: any): Observable<Budgetdetails> {
    return this.http.post<Budgetdetails>(this.apiIncomeDetailsURL + "/update-income", JSON.stringify(incomeSourceData), { "headers": this.httpOptions.header })
      .pipe(retry(1), catchError(this.handleError));
  }

  updateExpenseData(expenseData: any): Observable<Budgetdetails> {
    return this.http.post<Budgetdetails>(this.apiIncomeDetailsURL + "/update-income", JSON.stringify(expenseData), { "headers": this.httpOptions.header })
      .pipe(retry(1), catchError(this.handleError));
  }

  getTotalIncomeandExpenses(month: string, year: number): Observable<number[]> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http.get<number[]>(this.apiIncomeDetailsURL + "/get-totIncExp", { params })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage
    })
  }


}
