import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmSignUpInput } from 'aws-amplify/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CognitoService } from 'src/app/features/auth/services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';
import { ConfirmSignupPageViewModel, selectConfirmSignupPageViewModel } from './confirm-sign-up-page.selector';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up-page.component.html',
  styleUrls: ['./confirm-sign-up-page.component.scss']
})
export class ConfirmSignUpPageComponent {

  public vm$: Observable<ConfirmSignupPageViewModel> = this.store.select(selectConfirmSignupPageViewModel);

  loading: boolean = false;
  showPassword: boolean = false;
  confirmSignUpInput: ConfirmSignUpInput = {
    username: '',
    confirmationCode: '',
  } as ConfirmSignUpInput;

  constructor(private store: Store, private cognitoService: CognitoService) {
    this.vm$.subscribe((vm) => {
      this.confirmSignUpInput.username = vm.username ?? '';
    });
  }

  public confirmSignup(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.confirmSignUpInput);
  }

}
