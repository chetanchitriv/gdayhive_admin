import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from 'angular-admin-lte';
import { adminLteConf } from './admin-lte.conf';
import { ApiService } from '@services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DndModule } from 'ng2-dnd';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {SharedModule} from './shared/shared.module'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormService } from '@services/form.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from '@services/globalErrorHandler';

export function getToken() {
  return localStorage.getItem('token');
}
import { DataTablesModule } from "angular-datatables";
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,    
    ],
  imports: [
  
    BrowserModule,
    MatDatepickerModule,
    MatTabsModule,
    SlickCarouselModule,
    MatNativeDateModule,
    ModalModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setLocale('en-GB'),
    DndModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    LayoutModule.forRoot(adminLteConf),
    MatExpansionModule,
   
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    MatDatepickerModule,
    MatTabsModule,
    SlickCarouselModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatExpansionModule,TranslateModule],
  providers: [
    ApiService,
    FormService,
    BsModalRef,  
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
