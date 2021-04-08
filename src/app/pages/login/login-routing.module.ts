import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResetPasswordComponent} from './reset-password/reset-password.component'
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
