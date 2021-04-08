import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UtilityService } from '@services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(
    private auth: AuthService,
    private router: Router,
    private utility: UtilityService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.utility.clearStorage();
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.utility.clearStorage();
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
