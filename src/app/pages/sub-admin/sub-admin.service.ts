import { Injectable } from '@angular/core';
import { ADMIN_ROUTES } from '../../constants/constants';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SubAdminService {

  constructor(private apiservice:ApiService) { }

  
  async addSubAdmin(data) {
    return await this.apiservice.post(ADMIN_ROUTES.ADD_SUB_ADMIN, data, true);
  }


  async getAdmin(data){
    return await this.apiservice.get(ADMIN_ROUTES.GET_SUB_ADMIN, data,true);

  }
}
