import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface SetupTotpPageViewModel {
  setupURI: URL | undefined;
  sharedSecret: string | undefined;
}

export const selectSetupTotpPageViewModel = createSelector(
  fromAuth.selectTOTPSetupUri,
  fromAuth.selectTOTPSharedSecret,
  (setupURI: URL | undefined, sharedSecret: string | undefined): SetupTotpPageViewModel => ({
    setupURI: setupURI,
    sharedSecret: sharedSecret
  })
);
