import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { constants } from '../../global/constants';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any, _?: any): any {
    return  moment(value, [constants.HOURS_MIN_FORMAT]).format(constants.TWELEVE_HOUR_TIME_FORMAT);
  }

}
