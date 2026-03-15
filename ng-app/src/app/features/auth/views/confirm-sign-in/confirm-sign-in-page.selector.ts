import { createSelector } from '@ngrx/store';

import * as fromAuth from 'src/app/features/auth/store';

export interface ConfirmSignInPageViewModel {
  username: string | undefined | null;
  userId: string | undefined | null;
  deliveryMedium: 'EMAIL' | 'SMS' | 'PHONE' | 'TOTP' | 'UNKNOWN';
  destination: string;
}

export const selectConfirmSignInPageViewModel = createSelector(
  fromAuth.selectAuthState,
  (state: fromAuth.AuthState): ConfirmSignInPageViewModel => ({
    username: state.username,
    userId: state.userId,
    deliveryMedium: state.confirmAccountCodeDeliveryDetails?.deliveryMedium ?? state.confirmSignInCodeDeliveryDetails?.deliveryMedium ?? 'UNKNOWN',
    destination: state.confirmAccountCodeDeliveryDetails?.destination ?? '',
  })
);
