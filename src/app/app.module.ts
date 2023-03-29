import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExpenseModule } from './expense/expense.module';
import { FriendsModule } from './friends/friends.module';
import { GroupModule } from './group/group.module';
import { SettleUpModule } from './settle-up/settle-up.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserSignUpModule } from './user-sign-up/user-sign-up.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ExpenseModule,
    FriendsModule,
    GroupModule,
    SettleUpModule,
    TransactionModule,
    UserSignUpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
