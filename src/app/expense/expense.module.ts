import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';



@NgModule({
  declarations: [
    ExpenseAddEditComponent,
    ExpenseListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExpenseAddEditComponent,
    ExpenseListComponent
  ]
})
export class ExpenseModule { }
