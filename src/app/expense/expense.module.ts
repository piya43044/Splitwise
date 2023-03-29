import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';



@NgModule({
  declarations: [
    ExpenseAddEditComponent,
    ExpenseListComponent,
    ExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule
  ],
  exports: [
    ExpenseAddEditComponent,
    ExpenseListComponent
  ]
})
export class ExpenseModule { }
