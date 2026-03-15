import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface SignUpPageViewModel {
  showPasswordResetSuccessMessage: boolean;
  signUpErrorMessage: string | undefined | null;
}

export const selectSignUpPageViewModel = createSelector(
  fromAuth.selectPasswordResetSuccess,
  fromAuth.selectSignUpErrorMessage,
  (showPasswordResetSuccessMessage: boolean, signUpErrorMessage: string | undefined | null): SignUpPageViewModel => ({
    showPasswordResetSuccessMessage: showPasswordResetSuccessMessage,
    signUpErrorMessage: signUpErrorMessage
  })
);
