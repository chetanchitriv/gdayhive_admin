import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from '@services/utility.service';
import { LoginComponent } from './login.component';
import { SharedModule } from '@pages/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import {ROUTE_PATHS} from '../../constants/constants'
import { BsModalService } from 'ngx-bootstrap/modal';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path:ROUTE_PATHS.AUTH,component:LoginComponent},
      {path:ROUTE_PATHS.FORGOTPASSWORD,component:ForgotPasswordComponent},
      {path:ROUTE_PATHS. RE_PASSWORD,component:ResetPasswordComponent},
      {path:'change-password',component:ChangePasswordComponent},
      
    ])
  ],
  providers: [
    UtilityService
  ]
})
export class LoginModule { }
