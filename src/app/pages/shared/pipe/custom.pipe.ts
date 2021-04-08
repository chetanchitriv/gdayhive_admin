import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyNumber',
})
export class OnlyNumberPipe implements PipeTransform {

  /**
   * transform(value args) => Takes a value and makes it lowercase.
   * @param value in value
   * @param args in argument
   */
  transform(value: any, args?: any): any {
    let textValue = String(value);
    const beforePoint = textValue.split('.')[0];
    let integers = '';
    if (typeof beforePoint !== 'undefined') {
      integers += beforePoint.replace(/\D+/g, '');
    }
    textValue = integers;
    return textValue.toString();
  }
}
