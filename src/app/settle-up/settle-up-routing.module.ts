import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettleUpComponent } from './settle-up.component';

const routes: Routes = [
  { path:'', component: SettleUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettleUpRoutingModule { }
