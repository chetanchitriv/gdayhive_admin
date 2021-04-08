import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';

import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { UserDetailsComponent } from './user-details/user-details.component';

import { SharedModule } from '@pages/shared/shared.module';
import {ROUTE_PATHS} from '../../constants/constants';

import {UserEventDetailComponent} from './user-event-detail/user-event-detail.component'


@NgModule({
  declarations: [UserComponent, UserDetailsComponent,UserEventDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
  
    RouterModule.forChild([
      {path:'',component:UserComponent},
      {path:'user-detail/:id',component:UserDetailsComponent} ,
      {path:'user-event-details/:id',component:UserEventDetailComponent}   
    ]),
    DataTablesModule
  ]
})
export class UserModule { }
