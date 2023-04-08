import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupAddEditComponent } from './group-add-edit/group-add-edit.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GroupAddEditComponent,
    GroupListComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    GroupAddEditComponent,
    GroupListComponent
  ]
})
export class GroupModule { }
