import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupAddEditComponent } from './group-add-edit/group-add-edit.component';
import { GroupListComponent } from './group-list/group-list.component';



@NgModule({
  declarations: [
    GroupAddEditComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GroupAddEditComponent,
    GroupListComponent
  ]
})
export class GroupModule { }
