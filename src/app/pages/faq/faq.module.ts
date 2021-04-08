import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { RouterModule } from '@angular/router';
import {NewFaqsDetailsComponent} from './new-faqs-details/new-faqs-details.component';
import { EditFaqsComponent } from './edit-faqs/edit-faqs.component'

import { SharedModule } from '@pages/shared/shared.module';
import {ROUTE_PATHS} from '../../constants/constants'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FaqComponent, 
    EditFaqsComponent,
    NewFaqsDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild([
      {path:'',component:FaqComponent}, 
      {path:ROUTE_PATHS.NEW_FAQ,component:NewFaqsDetailsComponent},    
      {path:ROUTE_PATHS.EDIT_FAQ,component:EditFaqsComponent},           
    ])
  ]
})
export class FaqModule { }
