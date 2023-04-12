import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsAddEditComponent } from './friends-add-edit/friends-add-edit.component';
import { FriendsListComponent } from './friends-list/friends-list.component';


const routes: Routes = [
  { path:'friends-add', component: FriendsAddEditComponent },
  { path:'friends-list', component: FriendsListComponent },
  { path:'friends-edit/:routerParam', component: FriendsAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
