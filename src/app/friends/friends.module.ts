import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsAddEditComponent } from './friends-add-edit/friends-add-edit.component';
import { FriendsListComponent } from './friends-list/friends-list.component';



@NgModule({
  declarations: [
    FriendsAddEditComponent,
    FriendsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FriendsAddEditComponent,
    FriendsListComponent
  ]
})
export class FriendsModule { }
