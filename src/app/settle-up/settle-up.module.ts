import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OweListComponent } from './owe-list/owe-list.component';
import { TransactionPatternComponent } from './transaction-pattern/transaction-pattern.component';
import { SettleUpComponent } from './settle-up.component';



@NgModule({
  declarations: [
    OweListComponent,
    TransactionPatternComponent,
    SettleUpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OweListComponent,
    TransactionPatternComponent
  ]
})
export class SettleUpModule { }
