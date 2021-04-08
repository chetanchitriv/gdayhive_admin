import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoComponent } from './seo.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SeoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'',component:SeoComponent},
              
    ])
  ]
  
})
export class SeoModule { }
