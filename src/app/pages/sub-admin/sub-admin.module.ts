import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminComponent } from './sub-admin.component';
import { RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { NewSubAdminComponent } from './new-sub-admin/new-sub-admin.component';
import {ROUTE_PATHS} from '../../constants/constants'
import { SharedModule } from '@pages/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SubAdminComponent, NewSubAdminComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild([
      {path:'',component: SubAdminComponent}, 
      {path:ROUTE_PATHS.NEW_ADMIN,component:NewSubAdminComponent },          
    ])
  ]
})
export class SubAdminModule { }
