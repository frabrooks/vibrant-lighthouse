import { ActionReducer, createReducer, on } from '@ngrx/store';
import { rootEffectsInit } from '@ngrx/effects';

import * as fromAuth from '.';

export const featureKey: 'quadtodo.auth' = 'quadtodo.auth';

export interface AuthState {

  isAuthenticated: boolean | null;
  username: string | undefined | null;
  userId: string | undefined | null;
  idToken: string | null;
  accessToken: string | null;
  declinedMFA: boolean | undefined | null;

  purportedUsername: string | undefined | null;
  signInErrorMessage: string | undefined | null;
  confirmSignInErrorMessage: string | undefined | null;
  signUpErrorMessage: string | undefined | null;
  resetPasswordErrorMessage: string | undefined | null;
  confirmAccountCodeDeliveryDetails: {
    destination?: string;
    deliveryMedium?: 'EMAIL' | 'SMS' | 'PHONE' | 'UNKNOWN';
  } | null;
  confirmSignInCodeDeliveryDetails: {
    deliveryMedium?: 'EMAIL' | 'SMS' | 'PHONE' | 'TOTP' | 'UNKNOWN';
  } | null;
  availableChallenges: string[] | undefined;
  allowedMFATypes: string[] | undefined;
  totpSetupUri: URL | undefined;
  totpSharedSecret: string | undefined;
  resetPasswordSuccess: boolean;
}

const initialAuthState: AuthState = {
  
  isAuthenticated: null,
  username: null,
  userId: null,
  idToken: null,
  accessToken: null,
  declinedMFA: null,

  purportedUsername: null,
  signInErrorMessage: null,
  confirmSignInErrorMessage: null,
  signUpErrorMessage: null,
  resetPasswordErrorMessage: null,
  confirmAccountCodeDeliveryDetails: null,
  confirmSignInCodeDeliveryDetails: null,
  availableChallenges: undefined,
  allowedMFATypes: undefined,
  totpSetupUri: undefined,
  totpSharedSecret: undefined,
  resetPasswordSuccess: false,
};

const authReducer: ActionReducer<AuthState> = createReducer(
  initialAuthState,

  on(rootEffectsInit, (state) => ({
    ...state,
    resetPasswordSuccess: false,
  })),

  on(fromAuth.noUserSessionFound, fromAuth.signOutSuccess, (state) => ({
    ...initialAuthState,
    isAuthenticated: false,
  })),

  on(fromAuth.newPurportedUsername, (state, { username }) => ({
    ...state,
    purportedUsername: username,
  })),

  on(fromAuth.signInSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    confirmSignInCodeDeliveryDetails: null,
    confirmAccountCodeDeliveryDetails: null,
    availableChallenges: undefined,
    allowedMFATypes: undefined,
    setUpTOTPOutput: undefined,
    resetPasswordSuccess: false,
  })),

  on(fromAuth.signInError, (state, { error }) => ({
    ...state,
    signInErrorMessage: error.message,
  })),

  on(fromAuth.authUserSessionRetrieved, (state, { authSession }) => ({
    ...state,
    isAuthenticated: true,
    idToken: authSession.tokens?.idToken?.toString() ?? null,
    accessToken: authSession.tokens?.accessToken?.toString() ?? null,
  })),

  on(fromAuth.userDetailsRetrieved, (state, { authorisedUser }) => ({
    ...state,
    username: authorisedUser.username,
    userId: authorisedUser.id,
    declinedMFA: authorisedUser.attributes.declinedMFA,
  })),

  on(fromAuth.confirmationOfAccountNeededForSignUp, (state, { deliveryDetails, username, userId }) => ({
    ...state,
    confirmAccountCodeDeliveryDetails: deliveryDetails,
    username,
    userId,
  })),

  on(fromAuth.signUpCompleteWithNoNextStep, (state) => ({
    ...state,
    confirmAccountCodeDeliveryDetails: null,
  })),

  on(fromAuth.confirmSignInWithEmailCode, (state) => ({
    ...state,
    confirmSignInCodeDeliveryDetails: {
      deliveryMedium: 'EMAIL' as const,
    },
  })),

  on(fromAuth.confirmSignInWithSMSCode, (state) => ({
    ...state,
    confirmSignInCodeDeliveryDetails: {
      deliveryMedium: 'SMS' as const,
    },
  })),

  on(fromAuth.confirmSignInWithTOTPCode, (state) => ({
    ...state,
    confirmSignInCodeDeliveryDetails: {
      deliveryMedium: 'TOTP' as const,
    },
  })),

  on(fromAuth.continueSignInWithFirstFactorSelection, (state, { availableChallenges }) => ({
    ...state,
    availableChallenges,
  })),

  on(fromAuth.continueSignInWithMFASelection, fromAuth.continueSignInWithMFASetupSelection, (state, { allowedMFATypes }) => ({
    ...state,
    allowedMFATypes,
  })),

  on(fromAuth.setUpTOTPDetailsRetrieved, (state, { setUpUri, sharedSecret }) => ({
    ...state,
    totpSetupUri: setUpUri,
    totpSharedSecret: sharedSecret,
  })),

  on(fromAuth.requestResetPasswordSuccess, (state) => ({
    ...state,
    resetPasswordSuccess: true,
  })),

);

export function reducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}

