import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmSignInInput } from 'aws-amplify/auth';

import { CognitoService } from '../../services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';
import { FactorPageViewModel, selectFactorPageViewModel } from './factor-selection-page.selector';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-factor-selection',
  templateUrl: './factor-selection-page.component.html',
  styleUrls: ['./factor-selection-page.component.scss'],
})
export class FactorSelectionPageComponent {

  public vm$: Observable<FactorPageViewModel> = this.store.select(selectFactorPageViewModel);

  loading: boolean;
  confirmSignInInput: ConfirmSignInInput;
  acceptedInputs: string[] = ['EMAIL', 'SMS', 'TOTP'];

  constructor(private store: Store,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.confirmSignInInput = {
      challengeResponse: '',
    };
  }

  public respondWithSelection(): void {
    this.loading = true;
    this.cognitoService.confirmSignIn(this.confirmSignInInput);
  }

  public get isAcceptedInput(): boolean {
    return this.acceptedInputs.includes(this.confirmSignInInput.challengeResponse);
  }

}