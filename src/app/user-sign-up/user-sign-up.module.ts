import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSignUpRoutingModule } from './user-sign-up-routing.module';
import { UserSignUpComponent } from './user-sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSignUpComponent
  ],
  imports: [
    CommonModule,
    UserSignUpRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserSignUpModule { }
