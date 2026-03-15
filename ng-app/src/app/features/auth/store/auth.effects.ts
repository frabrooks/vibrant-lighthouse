import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType, rootEffectsInit } from "@ngrx/effects";
import { catchError, map, Observable, of, switchMap, tap, withLatestFrom } from "rxjs";
import { Action, Store } from "@ngrx/store";

import * as fromAuth from '.';
import { CognitoService } from "../services/cognito.service";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";

@Injectable()
export class AuthEffects {

  constructor(private store: Store, private actions: Actions, private router: Router, private cognitoService: CognitoService) {}

  public checkIfUserIsLoggedInOnAppLoad$: Observable<Action> = createEffect(() => this.actions.pipe(
    ofType(rootEffectsInit),
    switchMap(() => getCurrentUser()),
    map((user: AuthUser) => {
      if (user) {
        return fromAuth.authSignInDetailsFound({ user });
      } else {
        return fromAuth.noUserSessionFound();
      }
    }),
    catchError(() => {
      console.log('AuthEffects: checkIfUserIsLoggedIn$ - user is not logged in');
      return of(fromAuth.noUserSessionFound());
    })
  ));

  public getAuthSession$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(fromAuth.authSignInDetailsFound, fromAuth.signInSuccess),
    tap(() => {
      this.cognitoService.fetchAuthSession();
    })
  ), { dispatch: false });

  public redirectToConfirmSignUpPage$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(
      fromAuth.confirmationOfAccountNeededForSignUp,
      fromAuth.confirmSignUpStillNeeded
    ),
    switchMap(() => {
      this.router.navigate(['/auth/confirm-sign-up']);
      return [];
    })
  ), { dispatch: false });


  public autoSignIn$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(
      fromAuth.signUpCompleteAndNextStepIsAutoSignIn,
      fromAuth.signUpCompleteWithNoNextStep,
      fromAuth.resetPasswordSuccess
    ),
    withLatestFrom(this.store.select(fromAuth.selectPurportedUsername)),
    tap(([action, username]: [Action, string | null | undefined]) => {
      if (action.type === fromAuth.signUpCompleteAndNextStepIsAutoSignIn.type) {
        this.cognitoService.autoSignIn();
      } else if (username && this.cognitoService.hasPasswordInSession) {
        // We still actually want to 'auto' sign in in this case
        this.cognitoService.signIn({ username });
      } else {
        // Cannot log in user, route to sign in page
        this.router.navigate(['/auth/sign-in']);
      }
    })
  ), { dispatch: false });

  public getUserDetails$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(fromAuth.authUserSessionRetrieved),
    tap(() => {
      this.cognitoService.getCurrentUser();
    })
  ), { dispatch: false });


  // public checkMFAPreferenceOnSignIn$: Observable<unknown> = createEffect(() => this.actions.pipe(
  //   ofType(fromAuth.authSignInDetailsFound, fromAuth.signInSuccess),
  //   tap(() => {
  //     this.cognitoService.checkMFAPreference();
  //   })
  // ), { dispatch: false });

  public routeToHomeOnSignIn$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(fromAuth.authSignInDetailsFound, fromAuth.signInSuccess),
    tap(() => {
      console.log('AuthEffects: routeToHomeOnSignIn$ - routing to home');
      this.router.navigate(['/home']);
    })
  ), { dispatch: false });

  public routeToRootOnSignOut$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(fromAuth.signOutSuccess),
    tap(() => {
      console.log('AuthEffects: routeToRootOnSignOut$ - routing to root');
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  public routeToConfirmResetPasswordPage$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(
      fromAuth.requestResetPasswordSuccess,
      fromAuth.resetPasswordNeeded
    ),
    tap(() => {
      this.router.navigate(['/auth/reset-password']);
    })
  ), { dispatch: false });

  public redirectToConfirmSignInPage$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(
      fromAuth.confirmSignInWithTOTPCode,
      fromAuth.confirmSignInWithSMSCode,
      fromAuth.confirmSignInWithEmailCode,
    ),
    tap(() => {
      this.router.navigate(['/auth/confirm-sign-in']);
    })
  ), { dispatch: false });

  public redirectToFactorSelectionPage$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(
      fromAuth.continueSignInWithFirstFactorSelection,
      fromAuth.continueSignInWithMFASelection,
      fromAuth.continueSignInWithMFASetupSelection,
    ),
    tap(() => {
      this.router.navigate(['/auth/select']);
    })
  ), { dispatch: false });

  public redirectToTOTPSetupPage$: Observable<unknown> = createEffect(() => this.actions.pipe(
    ofType(fromAuth.setUpTOTPDetailsRetrieved),
    tap(() => {
      this.router.navigate(['/auth/totp-setup']);
    })
  ), { dispatch: false });

}
