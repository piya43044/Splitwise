import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

const routes: Routes = [
  { path:'expense-add', component: ExpenseAddEditComponent },
  { path:'expense-list', component: ExpenseListComponent },
  { path:'expense-edit/:routerParam', component: ExpenseAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
