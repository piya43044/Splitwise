import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './page-error/page-error.component';

const routes: Routes = [
  { path:'' , redirectTo:'login', pathMatch: 'full'}, 
  { path:'', loadChildren:() => import('./user-sign-up/user-sign-up.module')
    .then(mod => mod.UserSignUpModule)},
  { path:'**', component: PageErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
