import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { constants } from '../../global/constants';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, _?: any): any {
    return  moment(value).format(constants.DATE_FORMAT);
  }

}
