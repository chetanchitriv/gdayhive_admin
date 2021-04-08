import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CmsListComponent } from './cms-list/cms-list.component';
import { RouterModule } from '@angular/router';
import {CmsComponent} from './cms.component'

import { SharedModule } from '@pages/shared/shared.module';
import {ROUTE_PATHS} from '../../constants/constants';
import { UserGuideComponent } from './user-guide/user-guide.component'


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CmsComponent, UserGuideComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild([
      {path:'',component:CmsComponent},
      {path:ROUTE_PATHS.USER_GUIDE,component:UserGuideComponent},           
    ])
  ]
})
export class CmsModule { }
