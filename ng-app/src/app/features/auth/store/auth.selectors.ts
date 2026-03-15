import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromAuth from '.';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.featureKey);

export const selectIsAuthenticated = createSelector(selectAuthState, (state) => state.isAuthenticated);

export const selectConfirmAccountCodeDeliveryDetails = createSelector(selectAuthState, (state) => state.confirmAccountCodeDeliveryDetails);

export const selectConfirmSignInCodeDeliveryDetails = createSelector(selectAuthState, (state) => state.confirmSignInCodeDeliveryDetails);

export const selectPurportedUsername = createSelector(selectAuthState, (state) => state.purportedUsername);

export const selectSignInErrorMessage = createSelector(selectAuthState, (state): string | null | undefined => state.signInErrorMessage);


export const selectConfirmSignInErrorMessage = createSelector(selectAuthState, (state) => state.confirmSignInErrorMessage);

export const selectSignUpErrorMessage = createSelector(selectAuthState, (state) => state.signUpErrorMessage);

export const selectUsername = createSelector(selectAuthState, (state) => state.username);

export const selectUserId = createSelector(selectAuthState, (state) => state.userId);

export const selectAccessToken = createSelector(selectAuthState, (state) => state.accessToken);

export const selectAvailableChallenges = createSelector(selectAuthState, (state) => state.availableChallenges);

export const selectAllowedMFATypes = createSelector(selectAuthState, (state) => state.allowedMFATypes);

export const selectTOTPSetupUri = createSelector(selectAuthState, (state) => state.totpSetupUri);

export const selectTOTPSharedSecret = createSelector(selectAuthState, (state) => state.totpSharedSecret);

export const selectPasswordResetSuccess = createSelector(selectAuthState, (state) => state.resetPasswordSuccess);
