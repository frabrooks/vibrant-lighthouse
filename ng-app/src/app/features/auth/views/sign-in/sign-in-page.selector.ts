import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface SignInPageViewModel {
  showPasswordResetSuccessMessage: boolean;
  signInErrorMessage: string | undefined | null;
}

export const selectSignInPageViewModel = createSelector(
  fromAuth.selectPasswordResetSuccess,
  fromAuth.selectSignInErrorMessage,
  (showPasswordResetSuccessMessage: boolean, signInErrorMessage: string | undefined | null): SignInPageViewModel => ({
    showPasswordResetSuccessMessage: showPasswordResetSuccessMessage,
    signInErrorMessage: signInErrorMessage
  })
);
