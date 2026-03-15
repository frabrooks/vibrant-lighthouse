import { Routes } from "@angular/router";
import { isNotAuthenticatedGuard } from "./utils/unAuthenticated.guard";
import { SignUpPageComponent } from "./views/sign-up/sign-up-page.component";
import { ConfirmSignUpPageComponent } from "./views/confirm-sign-up/confirm-sign-up-page.component";
import { SignInPageComponent } from "./views/sign-in/sign-in-page.component";
import { ConfirmSignInPageComponent } from "./views/confirm-sign-in/confirm-sign-in-page.component";
import { FactorSelectionPageComponent } from "./views/factor-selection/factor-selection-page.component";
import { SetupTotpPageComponent } from "./views/setup-totp/setup-totp-page.component";
import { isAuthenticatedGuard } from "./utils/isAuthenticated.guard";
import { RequestResetPasswordPageComponent } from "./views/request-reset-password/request-reset-password-page.component";
import { ResetPasswordPageComponent } from "./views/reset-password/reset-password-page.component";
import { PasswordlessSignInPageComponent } from "./views/passwordless-sign-in/passwordless-sign-in-page.component";

export default [
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'confirm-sign-up',
    component: ConfirmSignUpPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'passwordless-sign-in',
    component: PasswordlessSignInPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'select',
    component: FactorSelectionPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'totp-setup',
    component: SetupTotpPageComponent,
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'confirm-sign-in',
    component: ConfirmSignInPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'request-reset-password',
    component: RequestResetPasswordPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
    canActivate: [isNotAuthenticatedGuard]
  }
] as Routes;
