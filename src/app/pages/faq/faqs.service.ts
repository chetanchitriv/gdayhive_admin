import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ADMIN_ROUTES } from '../../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(private apiservice:ApiService) { }


  async getFaqs(){
    return await this.apiservice.get(ADMIN_ROUTES.ALL_FAQ_LIST,false);
  }
  
  async addFaqs(data) {
    return await this.apiservice.post(ADMIN_ROUTES.NEW_FAQS, data, true);
  }

  async editFAQS(data) {
    return await this.apiservice.post(ADMIN_ROUTES.EDIT_FAQS, data, true);
  }
}
