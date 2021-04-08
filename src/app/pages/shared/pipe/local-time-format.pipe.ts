import { constants } from 'src/app/global/constants';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localTimeFormat',
})
export class LocalTimeFormatPipe implements PipeTransform {

  transform(value: any, _?: any): any {
      return  moment.utc(value).local().format(constants.LOCAL_TIME_STANDARD_FORMAT);
  }

}
