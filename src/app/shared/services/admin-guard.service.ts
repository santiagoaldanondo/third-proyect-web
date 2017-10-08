import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';


@Injectable()
export class AdminGuardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAdmin()) {
      return true
    } else {
      this.router.navigate(['/account/profile']);
      return false
    }
  }
}
