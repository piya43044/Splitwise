import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './page-error/page-error.component';

const routes: Routes = [
  { path:'' , redirectTo:'login', pathMatch: 'full'}, 
  { path:'', loadChildren:() => import('./user-sign-up/user-sign-up.module')
    .then(mod => mod.UserSignUpModule)},
  { path:'dashboard', loadChildren:() => import('./dashboard/dashboard.module')
    .then(mod => mod.DashboardModule) },
  { path:'group', loadChildren:() => import('./group/group.module')
    .then(mod => mod.GroupModule) },
  { path:'transaction', loadChildren:() => import('./transaction/transaction.module')
    .then(mod => mod.TransactionModule) },
  { path:'friends', loadChildren:() => import('./friends/friends.module')
    .then(mod => mod.FriendsModule) },
  { path:'expense', loadChildren:() => import('./expense/expense.module')
    .then(mod => mod.ExpenseModule) },
  { path:'settleUp', loadChildren:() => import('./settle-up/settle-up.module')
    .then(mod => mod.SettleUpModule) },
  { path:'**', component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
