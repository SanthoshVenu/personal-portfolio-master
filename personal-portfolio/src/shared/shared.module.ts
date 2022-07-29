import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModalComponent } from './components/popupmodal/popupmodal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIncomedetailsComponent } from './components/addincomedetails/addincomedetails.component';
import { MaterialModule } from './modules/material/material.module'



@NgModule({
  declarations: [PopupModalComponent, AddIncomedetailsComponent],
  imports: [
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [PopupModalComponent, CommonModule, FormsModule, AddIncomedetailsComponent]
})
export class SharedModule { }
