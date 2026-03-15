import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ConfirmSignInInput } from 'aws-amplify/auth';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import * as fromAuth from '../../store';

import { CognitoService } from 'src/app/features/auth/services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';
import { ConfirmSignInPageViewModel, selectConfirmSignInPageViewModel } from './confirm-sign-in-page.selector';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-confirm-sign-in',
  templateUrl: './confirm-sign-in-page.component.html',
  styleUrls: ['./confirm-sign-in-page.component.scss']
})
export class ConfirmSignInPageComponent {

  public vm$: Observable<ConfirmSignInPageViewModel> = this.store.select(selectConfirmSignInPageViewModel);

  loading: boolean = false;
  showPassword: boolean = false;
  confirmSignInInput: ConfirmSignInInput = {
    challengeResponse: '',
  } as ConfirmSignInInput;

  constructor(private store: Store, private actions: Actions, private cognitoService: CognitoService) {
    this.actions.pipe(ofType(fromAuth.confirmSignInError), takeUntilDestroyed()).subscribe(() => {
      this.loading = false;
    });
  }

  public confirmSignIn(): void {
    this.loading = true;
    this.cognitoService.confirmSignIn(this.confirmSignInInput);
  }

}
