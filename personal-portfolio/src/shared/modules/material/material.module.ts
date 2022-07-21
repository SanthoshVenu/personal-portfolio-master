import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

const MaterialComponent = [MatButtonModule, MatToolbarModule, MatCardModule,
  MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule];

@NgModule({
  imports: [MaterialComponent],
  exports: [MaterialComponent],
  declarations: []
})
export class MaterialModule { }
