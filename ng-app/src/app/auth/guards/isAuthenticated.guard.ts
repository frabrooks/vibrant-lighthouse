import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CognitoService } from '../cognito.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard  {
  constructor(private cognitoService: CognitoService, public router: Router) {}

  canActivate(): boolean | UrlTree {
    console.log('isAuthenticated guard: entering...');
    if (this.cognitoService.isAuthenticated$.value) {
      console.log(`isAuthenticated guard: continuing...`);
      return true;
    } else {
      console.log('isAuthenticated guard: redirecting to root splash...');
      return this.router.parseUrl('/');
    }
  }
}