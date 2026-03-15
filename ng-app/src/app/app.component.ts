import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { CognitoService } from './features/auth/services/cognito.service';
import { Store } from '@ngrx/store';

interface formDataInterface {
  "name": string;
  "family_name": string;
  "email": string;
  "phone_number": string;
  [key: string]: string;
};

import * as fromAuth from './features/auth/store';
import { GridComponents } from './shared/components/grid/grid.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ...GridComponents
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public appName: string = "Quad Todo";
  readonly isAuthenticated$: Observable<boolean>;
  readonly email$: Observable<string>;
  
  constructor(private store: Store, private router: Router, private cognitoService: CognitoService) {
    
    this.isAuthenticated$ = this.store.select(fromAuth.selectIsAuthenticated).pipe(map((isAuthenticated) => !!isAuthenticated));
    this.email$ = this.store.select(fromAuth.selectUsername).pipe(map((username) => username ?? ''));
  }

  ngOnInit(): void {
  }

  public signOut(): void {
    this.cognitoService.signOut();
  }

  public createAccount(): void {
    this.router.navigate(['auth/sign-up']);
  }

  public confirmAccount(): void {
    this.router.navigate(['auth/confirm-sign-up']);
  }

  public signIn(): void {
    this.router.navigate(['auth/sign-in']);
  }

}
