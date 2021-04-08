import { Injectable } from '@angular/core';
import { ADMIN_ROUTES } from '../../constants/constants';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor( private apiservice:ApiService) { }

  async getAllEvent(){
    return await this.apiservice.get(ADMIN_ROUTES.ALL_EVENT_LIST,false);
  }

  async addEvent(data) {
    return await this.apiservice.post(ADMIN_ROUTES.CREAT_EVENT, data, true);
  }

  async editEvent(data) {
    return await this.apiservice.post(ADMIN_ROUTES.EDIT_EVENT, data, true);
  }

  async getEventDetail(data){
    return await this.apiservice.post(ADMIN_ROUTES.EVENT_DETAIL,data,true);

  }

}
