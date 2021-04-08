import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[numbersOnly]',
})
export class NumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onInputChange(event) {
    const patt = /^([0-9])$/;
    const result = patt.test(event.key);
    return result;
  }
}
