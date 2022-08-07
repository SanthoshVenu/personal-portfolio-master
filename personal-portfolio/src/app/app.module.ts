import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './welcome-page/header/header.component';
import { FooterComponent } from './welcome-page/footer/footer.component';
import { HomepageComponent } from './welcome-page/homepage/homepage.component';
import { CardComponent } from './welcome-page/card/card.component';
import { ExpenseTrackerComponent } from './budgeting-tool/expense-tracker/expense-tracker.component';
import { IncomeExpenseComponent } from './budgeting-tool/income-expense/income-expense.component';
import { ExpenseTrackerService } from '../shared/services/expensetrackerservice.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseDetailsTableComponent } from './budgeting-tool/expense-details-table/expense-details-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    CardComponent,
    ExpenseTrackerComponent,
    IncomeExpenseComponent,
    ExpenseDetailsTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule

  ],

  providers: [ExpenseTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
