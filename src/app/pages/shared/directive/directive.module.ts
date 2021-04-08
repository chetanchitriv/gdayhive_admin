import { DebounceKeyupDirective } from './debounce-keyup.directive';
import { NumberDirective } from './number-only.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    NumberDirective,
    DebounceKeyupDirective
  ],
  exports: [
    NumberDirective,
    DebounceKeyupDirective
  ]
})
export class DirectiveModule { }
