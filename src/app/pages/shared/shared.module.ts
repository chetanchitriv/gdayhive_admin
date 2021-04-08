import { SidebarTreeComponent } from './left-sidebar/sidebar-tree/sidebar-tree.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { SearchComponent } from './search/search.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatSortModule } from '@angular/material/sort';
import { UtilityService } from '@services/utility.service';
import { HttpRequestsService } from '@services/http-requests.service';
import { DndModule } from 'ng2-dnd';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonPaginationComponent } from './common-pagination/common-pagination.component';
import { AvailableListComponent } from './available-list/available-list.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormService } from '@services/form.service';
import { ValidationMessageModule } from './validation-message/validation-message.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OnlyNumberPipe } from './pipe/custom.pipe';

import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatExpansionModule } from '@angular/material/expansion';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarItemComponent } from './left-sidebar/sidebar-tree/sidebar-item/sidebar-item.component';
import { ConfirmationComponent } from './confirmation-dialog/confirmation.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CommonPaginationComponent,
    OnlyNumberPipe,
    SearchComponent,
    LeftSidebarComponent,
    SidebarTreeComponent,
    SidebarItemComponent,
    ConfirmationComponent,
    AvailableListComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    SlickCarouselModule,
    MatTabsModule,
    NgSelectModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setLocale('en-GB'),
    NgSelectModule,
    FullCalendarModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    MatSortModule,
    ModalModule.forRoot(),
    DndModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot(),
    RouterModule 
  ],
  exports: [
    MatDatepickerModule,
    MatTabsModule,
    NgSelectModule,
    SlickCarouselModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    NgSelectModule,
    FullCalendarModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    MatSortModule,
    DndModule,
    CommonPaginationComponent,
    ValidationMessageModule,
    NgMultiSelectDropDownModule,
    OnlyNumberPipe,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    SearchComponent,
    LeftSidebarComponent,
    ConfirmationComponent,
    AvailableListComponent,
    SidebarItemComponent,
    RouterModule ,
    TranslateModule
  ],
  providers: [
    UtilityService,
    HttpRequestsService,
    FormService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class SharedModule { }
