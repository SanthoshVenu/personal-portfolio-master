import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTrackerComponent } from './budgeting-tool/expense-tracker/expense-tracker.component';
import { HomepageComponent } from './welcome-page/homepage/homepage.component';

const routes: Routes = [
  {
    path: 'ExpenseTracker',
    component: ExpenseTrackerComponent,
  },
  {
    path: 'Home',
    component: HomepageComponent,
  },
  {
    path: '**',
    component: HomepageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
