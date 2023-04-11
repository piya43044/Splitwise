import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsAddEditComponent } from './friends-add-edit/friends-add-edit.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendsComponent } from './friends.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FriendsAddEditComponent,
    FriendsListComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    FriendsAddEditComponent,
    FriendsListComponent
  ]
})
export class FriendsModule { }
