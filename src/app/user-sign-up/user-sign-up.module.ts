import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSignUpRoutingModule } from './user-sign-up-routing.module';
import { UserSignUpComponent } from './user-sign-up.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSignUpComponent
  ],
  imports: [
    CommonModule,
    UserSignUpRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserSignUpModule { }
