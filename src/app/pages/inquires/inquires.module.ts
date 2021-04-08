import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiresComponent } from './inquires.component';
import { RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [InquiresComponent],
  imports: [
    CommonModule,
    DataTablesModule,
  
  
    RouterModule.forChild([
      {path:'',component:InquiresComponent},        
    ])
  ]

  
})
export class InquiresModule { }
