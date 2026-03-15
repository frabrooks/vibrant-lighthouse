import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface PasswordlessSignInPageViewModel {
  showPasswordResetSuccessMessage: boolean;
  signInErrorMessage: string | undefined | null;
}

export const selectPasswordlessSignInPageViewModel = createSelector(
  fromAuth.selectPasswordResetSuccess,
  fromAuth.selectSignInErrorMessage,
  (showPasswordResetSuccessMessage: boolean, signInErrorMessage: string | undefined | null): PasswordlessSignInPageViewModel => ({
    showPasswordResetSuccessMessage: showPasswordResetSuccessMessage,
    signInErrorMessage: signInErrorMessage
  })
);
