import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionPatternComponent } from './transaction-pattern/transaction-pattern.component';
import { OweListComponent } from './owe-list/owe-list.component';

const routes: Routes = [
  { path:'owe-list', component: OweListComponent },
  { path:'transaction-pattern', component: TransactionPatternComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettleUpRoutingModule { }
