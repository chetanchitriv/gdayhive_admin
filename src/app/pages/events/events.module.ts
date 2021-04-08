import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { CreatEventComponent } from './creat-event/creat-event.component';
import { SharedModule } from '@pages/shared/shared.module';
import {ROUTE_PATHS} from '../../constants/constants'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ EventDetailsComponent, EventsComponent, CreatEventComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild([
      {path:'',component:EventsComponent},
      {path:ROUTE_PATHS.EVENT_DETAILS ,component:EventDetailsComponent},    
      {path:ROUTE_PATHS.CREATEEVENT,component:CreatEventComponent},         
    ])
  ]
})
export class EventsModule { }
