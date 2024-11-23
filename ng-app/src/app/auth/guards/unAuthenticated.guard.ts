import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CognitoService } from '../cognito.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard  {
  constructor(private cognitoService: CognitoService, public router: Router) {}

  canActivate(): boolean | UrlTree {
    console.log('unAuthenticated guard: entering...');
    if (this.cognitoService.isAuthenticated$.value) {
      console.log(`unAuthenticated guard: redirecting to todos...`);
      return this.router.parseUrl('/todos');
    } else {
      console.log('unAuthenticated guard: continuing...');
      return true;
    }
  }
}