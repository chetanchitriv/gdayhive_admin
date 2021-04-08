import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilityService } from '@services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private utility: UtilityService,
  ) { }

  public isAuthenticated(): boolean {
    const token = this.utility.getLocalStore('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
