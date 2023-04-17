import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettleUpComponent } from './settle-up.component';
import { SettleUpRoutingModule } from './settle-up-routing.module';


@NgModule({
  declarations: [
    SettleUpComponent
  ],
  imports: [
    CommonModule,
    SettleUpRoutingModule
  ]
})
export class SettleUpModule { }
