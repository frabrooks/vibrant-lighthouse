import { createAction, props } from "@ngrx/store";
import { AuthSession, AuthUser, SetUpTOTPOutput } from "aws-amplify/auth";
import { AuthorisedUser } from "../services/cognito.service";

export const authSignInDetailsFound = createAction('[Auth] Sign In Details Found', props<{ user: AuthUser }>());

export const noUserSessionFound = createAction('[Auth] No User Session Found');

export const authUserSessionRetrieved = createAction('[Auth] User Session Retrieved', props<{ authSession: AuthSession }>());

export const signUpCompleteWithNoNextStep = createAction('[Auth] Sign Up Complete And Next Step No Auto Sign In');

export const confirmationOfAccountNeededForSignUp = createAction('[Auth] Confirmation Of Account Needed', props<{ deliveryDetails: {
  destination?: string;
  deliveryMedium?: 'EMAIL' | 'SMS' | 'PHONE' | 'UNKNOWN';
}, username: string, userId: string | undefined }>());


export const signUpCompleteAndNextStepIsAutoSignIn = createAction('[Auth] Sign Up Complete And Next Step Auto Sign In');

export const newPurportedUsername = createAction('[Auth] New purported username', props<{ username: string }>());

export const signInSuccess = createAction('[Auth] Sign In Success');

export const signInError = createAction('[Auth] Sign In Error', props<{ error: Error }>());

export const userDetailsRetrieved = createAction('[Auth] User Details Retrieved', props<{ authorisedUser: AuthorisedUser }>());

export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const requestResetPasswordSuccess = createAction('[Auth] Request Reset Password Success');

export const resetPasswordSuccess = createAction('[Auth] Reset Password Success');

export const resetPasswordFailure = createAction('[Auth] Reset Password Failure');

export const confirmSignInWithNewPasswordRequired = createAction('[Auth] Confirm Sign In With New Password Required');

export const confirmSignInWithCustomChallenge = createAction('[Auth] Confirm Sign In With Custom Challenge');

export const confirmSignInWithTOTPCode = createAction('[Auth] Confirm Sign In With TOTP Code');

export const confirmSignInWithSMSCode = createAction('[Auth] Confirm Sign In With SMS Code');

export const confirmSignInWithEmailCode = createAction('[Auth] Confirm Sign In With Email Code');

export const confirmSignInWithPassword = createAction('[Auth] Confirm Sign In With Password');

export const confirmSignInError = createAction('[Auth] Confirm Sign In Error', props<{ error: Error }>());

export const continueSignInWithFirstFactorSelection = createAction('[Auth] Continue Sign In With First Factor Selection', props<{ availableChallenges: string[] | undefined }>());

export const continueSignInWithMFASelection = createAction('[Auth] Continue Sign In With MFA Selection', props<{ allowedMFATypes: string[] | undefined }>());

export const continueSignInWithMFASetupSelection = createAction('[Auth] Continue Sign In With MFA Setup Selection', props<{ allowedMFATypes: string[] | undefined }>());

export const continueSignInWithTOTPSetup = createAction('[Auth] Continue Sign In With TOTP Setup');

export const continueSignInWithEmailSetup = createAction('[Auth] Continue Sign In With Email Setup');

export const resetPasswordNeeded = createAction('[Auth] Reset Password Needed');

export const confirmSignUpStillNeeded = createAction('[Auth] Confirm Sign Up Still Needed');

export const setUpTOTPDetailsRetrieved = createAction('[Auth] Set Up TOTP Details Retrieved', props<{ setUpUri: URL, sharedSecret: string }>());

export const setUpTOTPSuccess = createAction('[Auth] Set Up TOTP Success');
