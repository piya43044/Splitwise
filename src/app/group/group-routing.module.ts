import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupAddEditComponent } from './group-add-edit/group-add-edit.component';
import { GroupComponent } from './group.component';

const routes: Routes = [
  { path:'group-add', component: GroupAddEditComponent },
  { path:'group-list', component: GroupListComponent },
  { path:'group-edit/:routerParam', component: GroupAddEditComponent },
  { path:'group-list/:routerParam', component: GroupListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
