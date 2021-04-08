import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ReportsComponent},
              
    ])
  ]
})
export class ReportsModule { }
