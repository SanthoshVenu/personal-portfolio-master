import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './welcome-page/header/header.component';
import { FooterComponent } from './welcome-page/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './welcome-page/homepage/homepage.component';
import { MaterialModule } from './welcome-page/material-module/material.module';
import { CardComponent } from './welcome-page/card/card.component';
import { ExpenseTrackerComponent } from './budgeting-tool/expense-tracker/expense-tracker.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    CardComponent,
    ExpenseTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
