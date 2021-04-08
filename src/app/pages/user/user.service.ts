import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { LOCAL_STORAGE_KEYS, USER_ROUTES ,ADMIN_ROUTES } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(  private apiService: ApiService,) { }

  async userList(data) {
    return this.apiService.post(ADMIN_ROUTES.USER_LIST, data, true);
  }

  async userDetails(data) {
    return this.apiService.post(ADMIN_ROUTES.USER_DETAILS, data, true);
  }
  async changeStatus(result){
    return this.apiService.post(ADMIN_ROUTES.USER_STATUS, result, true);

  }

}
