import { SafeHtmlPipe } from './safe-html.pipe';
import { LocalTimeFormatPipe } from './local-time-format.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { TimeFormatPipe } from './time-format.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
   TimeFormatPipe,
   DateFormatPipe,
   LocalTimeFormatPipe,
   SafeHtmlPipe
  ],
  exports: [
   TimeFormatPipe,
   DateFormatPipe,
   LocalTimeFormatPipe,
   SafeHtmlPipe
  ]
})
export class PipeModule { }
