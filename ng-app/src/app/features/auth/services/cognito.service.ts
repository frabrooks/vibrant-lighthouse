import { Injectable } from "@angular/core";
import { Amplify } from "aws-amplify";
import { 
  getCurrentUser, 
  fetchUserAttributes,
  fetchAuthSession,
  AuthUser,
  AuthSession,
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  updateUserAttributes,
  SignInInput,
  SignUpInput,
  SignUpOutput,
  ConfirmSignUpInput,
  autoSignIn,
  SignInOutput,
  ConfirmSignUpOutput,
  ConfirmSignInInput,
  confirmSignIn,
  ConfirmSignInOutput,
  setUpTOTP,
  SetUpTOTPOutput,
  VerifyTOTPSetupInput,
  verifyTOTPSetup,
  updateMFAPreference,
  resetPassword,
  ResetPasswordOutput,
  ResetPasswordInput,
  ConfirmResetPasswordInput,
  confirmResetPassword,
  FetchUserAttributesOutput
} from 'aws-amplify/auth';
import { Store } from "@ngrx/store";

import * as fromAuth from '../store';

import { environment } from "src/environments/environment";

export interface AuthorisedUser {
  attributes: {
    email: string | undefined;
    email_verified: string | undefined;
    sub: string | undefined;
    declinedMFA: boolean | undefined;
  },
  id: string;
  username: string;
}

// TODO: This is used on profile page which has not bee touched in a while
export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}


@Injectable({
    providedIn: 'root'
})
export class CognitoService {

  // Keep password in session rather than in NgRx store which is synced with localStorage
  public password: string = '';

  constructor(private store: Store) {
    Amplify.configure({
      Auth: environment.cognito,
    });
  }

  public storePasswordInSessionForDurationOfAuthenticationFlow(password: string | undefined): void {
    if (password) {
      this.password = password;
    }
  }

  public get hasPasswordInSession(): boolean {
    return !!this.password;
  }

  public signUp(signUpInput: SignUpInput): void {
    signUp(signUpInput).then((signUpOutput: SignUpOutput) => {
      switch (signUpOutput.nextStep.signUpStep) {
        case 'CONFIRM_SIGN_UP':
          this.store.dispatch(fromAuth.confirmationOfAccountNeededForSignUp({ deliveryDetails: signUpOutput.nextStep.codeDeliveryDetails, username: signUpInput.username, userId: signUpOutput.userId }));
          break;
        case 'COMPLETE_AUTO_SIGN_IN':
          this.store.dispatch(fromAuth.signUpCompleteAndNextStepIsAutoSignIn());
          break;
        case 'DONE':
          this.store.dispatch(fromAuth.signUpCompleteWithNoNextStep());
          break
        default:
          break;
      }
    }).catch((e) => {
      console.error('error:', e);
    });
  }

  public confirmSignUp(confirmSignUpInput: ConfirmSignUpInput): void {
    this.store.dispatch(fromAuth.newPurportedUsername({ username: confirmSignUpInput.username }));
    confirmSignUp(confirmSignUpInput).then((confirmSignUpOutput: ConfirmSignUpOutput) => {
      switch (confirmSignUpOutput.nextStep.signUpStep) {
        case 'COMPLETE_AUTO_SIGN_IN':
          this.store.dispatch(fromAuth.signUpCompleteAndNextStepIsAutoSignIn());
          break;
        case 'DONE':
          this.store.dispatch(fromAuth.signUpCompleteWithNoNextStep());
          break;
        default:
          break;
      }
    }).catch((e) => {
      console.error('error:', e);
    });
  }

  public fetchAuthSession(): void {
    fetchAuthSession().then((authSession: AuthSession) => {
      console.log('Cognito getAuthSession - authSession: ', authSession);
      this.store.dispatch(fromAuth.authUserSessionRetrieved({ authSession }));
    }).catch((e) => {
      console.error('error:', e);
    });
  }

  public getCurrentUser(): void {
    getCurrentUser().then((user: AuthUser) => {
      return fetchUserAttributes().then((attributes: FetchUserAttributesOutput) => {
        console.log('attributes:', attributes);
        const declinedMFA = attributes?.['custom:declinedMFA'] !== undefined ? attributes['custom:declinedMFA'] === 'true' : undefined;
        console.log('declinedMFA:', declinedMFA);
        const authorisedUser: AuthorisedUser = {
          attributes: {
            email: attributes.email,
            email_verified: attributes.email_verified,
            sub: attributes.sub,
            declinedMFA
          },
          id: user.username,
          username: user.username
        };
        this.store.dispatch(fromAuth.userDetailsRetrieved({ authorisedUser }));
      });
    });
  }

  public updateMFADeclinedUserAttribute(value: '0' | '1'): Promise<void> {
    return updateUserAttributes({
      userAttributes: {
        'custom:declinedMFA': value
      }
    }).then(() => {
      console.log('updateUserAttributes - success');
    }).catch((e) => {
      console.error('error:', e);
    });
  }

  public autoSignIn(): void {
    autoSignIn().then((signInOutput: SignInOutput) => {
      this.handleSignInOutput(signInOutput);
    }).catch((e) => {
      console.error('error:', e);
    });
  }

  public signIn(signInInput: SignInInput): void {
    this.store.dispatch(fromAuth.newPurportedUsername({ username: signInInput.username }));
    if (!signInInput.password) {
      signInInput.password = this.password;
    }
    signIn(signInInput).then((signInOutput: SignInOutput) => {
      this.handleSignInOutput(signInOutput);
    }).catch((e) => {
      console.error('signIn error:', e);
      this.store.dispatch(fromAuth.signInError({ error: e }));
    });
  }

  public confirmSignIn(confirmSignInInput: ConfirmSignInInput): void {
    confirmSignIn(confirmSignInInput).then((confirmSignInOutput: ConfirmSignInOutput) => {
      console.log('confirmSignInOutput:', confirmSignInOutput);
      this.handleSignInOutput(confirmSignInOutput);
    }).catch((e) => {
      console.error('confirmSignIn error:', e);
      this.store.dispatch(fromAuth.confirmSignInError({ error: e }));
    });
  }


  private handleSignInOutput(signInOutput: SignInOutput): void {
    console.log('signInOutput:', signInOutput);
    if (signInOutput.isSignedIn) {
      this.store.dispatch(fromAuth.signInSuccess());
    } else if (signInOutput.nextStep.signInStep) {
      switch (signInOutput.nextStep.signInStep) {
        case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
          console.log('CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED');
          this.store.dispatch(fromAuth.confirmSignInWithNewPasswordRequired());
          break;
        case 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE':
          this.store.dispatch(fromAuth.confirmSignInWithCustomChallenge());
          break;
        case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
          this.store.dispatch(fromAuth.confirmSignInWithTOTPCode());
          break;
        case 'CONFIRM_SIGN_IN_WITH_SMS_CODE':
          this.store.dispatch(fromAuth.confirmSignInWithSMSCode());
          break;
        case 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE':
          this.store.dispatch(fromAuth.confirmSignInWithEmailCode());
          break;
        case 'CONFIRM_SIGN_IN_WITH_PASSWORD':
          this.store.dispatch(fromAuth.confirmSignInWithPassword());
          break;
        case 'CONTINUE_SIGN_IN_WITH_FIRST_FACTOR_SELECTION':
          this.store.dispatch(fromAuth.continueSignInWithFirstFactorSelection({ availableChallenges: signInOutput.nextStep.availableChallenges }));
          break;
        case 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION':
          this.store.dispatch(fromAuth.continueSignInWithMFASelection({ allowedMFATypes: signInOutput.nextStep.allowedMFATypes }));
          break;
        case 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION':
          this.store.dispatch(fromAuth.continueSignInWithMFASetupSelection({ allowedMFATypes: signInOutput.nextStep.allowedMFATypes }));
          break;
        case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
          this.store.dispatch(fromAuth.continueSignInWithTOTPSetup());
          break;
        case 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP':
          this.store.dispatch(fromAuth.continueSignInWithEmailSetup());
          break;
        case 'RESET_PASSWORD':
          this.store.dispatch(fromAuth.resetPasswordNeeded());
          break;
        case 'CONFIRM_SIGN_UP':
          this.store.dispatch(fromAuth.confirmSignUpStillNeeded());
          break;
        case 'DONE':
          this.password = '';
          this.store.dispatch(fromAuth.signInSuccess());
          break;
        default:
          break;
      }
    }
  }
   
  public signOut(): void {
    signOut()
      .then(() => {
        this.store.dispatch(fromAuth.signOutSuccess());
      }).catch((e) => {
        console.error('error:', e);
      });
  }

  public requestResetPassword(resetPasswordInput: ResetPasswordInput): void {
    this.store.dispatch(fromAuth.newPurportedUsername({ username: resetPasswordInput.username }));
    resetPassword(resetPasswordInput).then((resetPasswordOutput: ResetPasswordOutput) => {
      console.log('resetPasswordOutput:', resetPasswordOutput);
      if (resetPasswordOutput.nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        this.store.dispatch(fromAuth.requestResetPasswordSuccess());
      } else {
        this.store.dispatch(fromAuth.resetPasswordFailure());
      }
    }).catch((e) => {
      console.error('error:', e);
      this.store.dispatch(fromAuth.resetPasswordFailure());
    });
  }

  public confirmResetPassword(confirmResetPasswordInput: ConfirmResetPasswordInput): void {
    this.store.dispatch(fromAuth.newPurportedUsername({ username: confirmResetPasswordInput.username }));
    confirmResetPassword(confirmResetPasswordInput).then(() => {
      console.log('confirmResetPassword - success');
      this.password = confirmResetPasswordInput.newPassword;
      this.store.dispatch(fromAuth.resetPasswordSuccess());
    }).catch((e) => {
      console.error('error:', e);
    });
  }
  
  public updateUser(user: IUser): Promise<any> {
    return updateUserAttributes({
      userAttributes: {
        name: user.name
      }
    });
  }

  public setUpTOTP(): void {
    setUpTOTP().then((setUpTOTPOutput: SetUpTOTPOutput) => {
      console.log('setUpTOTPOutput:', setUpTOTPOutput);
      this.store.dispatch(fromAuth.setUpTOTPDetailsRetrieved({ setUpUri: setUpTOTPOutput.getSetupUri('QuadTodo'), sharedSecret: setUpTOTPOutput.sharedSecret }));
    }).catch((e) => {
      console.error('error:', e);
    });
  }

  public verifyTotpSetup(verifyTotpInput: VerifyTOTPSetupInput): void {
    verifyTOTPSetup(verifyTotpInput).then(() => {
      console.log('verifyTOTPSetup - success');
      updateMFAPreference({ totp: 'PREFERRED' }).then(() => {
        console.log('updateMFAPreference - success');
        this.store.dispatch(fromAuth.setUpTOTPSuccess());
        this.signOut();
      }).catch((e) => {
        console.error('error:', e);
      });
    }).catch((e) => {
      console.error('error:', e);
    });
  }
}