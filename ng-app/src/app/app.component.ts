import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState, CognitoService } from './auth/cognito.service';

interface formDataInterface {
  "name": string;
  "family_name": string;
  "email": string;
  "phone_number": string;
  [key: string]: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public appName: string = "Eisen Todo v.1.0.0";
  readonly auth$: Observable<AuthState>;
  readonly isAuthenticated$: Observable<boolean>;
  
  constructor(private router: Router, private cognitoService: CognitoService) {
    this.auth$ = cognitoService.auth$;
    this.isAuthenticated$ = cognitoService.isAuthenticated$;
  }

  ngOnInit(): void {
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  public signIn(): void {
    this.router.navigate(['/sign-in']);
  }

  public createAccount(): void {
    this.router.navigate(['/sign-up']);
  }

}
