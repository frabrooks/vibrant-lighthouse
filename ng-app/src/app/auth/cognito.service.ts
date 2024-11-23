import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Amplify, Auth } from 'aws-amplify';
import { environment } from "src/environments/environment";

export interface AuthorisedUser {
  attributes: {
    email: string;
    email_verified: boolean;
    sub: string;
  },
  id: string;
  username: string;
}

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

export interface AuthI {
  isLoggedIn: boolean;
  user: AuthorisedUser | null;
  accessToken: any;
  idToken: any;
}

export type AuthState = AuthI | null;

@Injectable({
    providedIn: 'root'
})
export class CognitoService {

  readonly auth$ = new BehaviorSubject<AuthState>(null);
  readonly isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.auth$.subscribe((x) => this.isAuthenticated$.next(!!x));

    Amplify.configure({
      Auth: environment.cognito,
    });

    Auth.currentUserInfo().then((user) => {
      console.log('Cognito init - user: ', user);
      Auth.currentSession().then((session) => {
        console.log('Cognito init - session: ', session);
        if (user && session) this.auth$.next({
          isLoggedIn: true,
          user: user,
          accessToken: session.getAccessToken(),
          idToken: session.getIdToken()
        });
      }).catch(() => {});
    }).catch(() => {});
  }

  // public isAuthenticated(): Promise<boolean> {
  //   if (this.auth$.value) {
  //     return Promise.resolve(true);
  //   } else {
  //     return this.getUser()
  //     .then((user: any) => {
  //       if (user) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }).catch(() => {
  //       return false;
  //     });
  //   }
  // }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      Auth.currentUserInfo()
      .then((user) => {
        console.log('Cognito signIn - user: ', user);
        Auth.currentSession().then((session) => {
          console.log('Cognito signIn - user: ', session);
          if (user && session) this.auth$.next({
            isLoggedIn: true,
            user: user,
            accessToken: session.getAccessToken(),
            idToken: session.getIdToken()
          });
        });
        if (user) this.auth$.next({
          isLoggedIn: true,
          user: user,
          accessToken: null,
          idToken: null
        });
      });
    });
  }
  
  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.auth$.next(null);
    });
  }

  public getUser(): Promise<AuthorisedUser> {
    return Auth.currentUserInfo();
  }
  
  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}