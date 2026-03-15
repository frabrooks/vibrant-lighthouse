import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface FactorPageViewModel {
  availableChallenges: string[];
  allowedMFATypes: string[];
}

export const selectFactorPageViewModel = createSelector(
  fromAuth.selectAvailableChallenges,
  fromAuth.selectAllowedMFATypes,
  (availableChallenges: string[] | undefined, allowedMFATypes: string[] | undefined): FactorPageViewModel => ({
    availableChallenges: availableChallenges || [],
    allowedMFATypes: allowedMFATypes || []
  })
);
