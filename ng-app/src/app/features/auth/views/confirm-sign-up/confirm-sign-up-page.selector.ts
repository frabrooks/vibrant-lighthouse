import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface ConfirmSignupPageViewModel {
  username: string | undefined | null;
  userId: string | undefined | null;
  deliveryMedium: 'EMAIL' | 'SMS' | 'PHONE' | 'UNKNOWN';
  destination: string;
}

export const selectConfirmSignupPageViewModel = createSelector(
  fromAuth.selectAuthState,
  (state: fromAuth.AuthState): ConfirmSignupPageViewModel => ({
    username: state.username ?? state.purportedUsername,
    userId: state.userId,
    deliveryMedium: state.confirmAccountCodeDeliveryDetails?.deliveryMedium ?? 'UNKNOWN',
    destination: state.confirmAccountCodeDeliveryDetails?.destination ?? '',
  })
);
