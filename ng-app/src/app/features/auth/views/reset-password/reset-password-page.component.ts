import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmResetPasswordInput } from 'aws-amplify/auth';
import { Store } from '@ngrx/store';

import { CognitoService } from '../../services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-reset-password',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent {

  loading: boolean;
  confirmResetPasswordInput: ConfirmResetPasswordInput;

  constructor(private store: Store, private cognitoService: CognitoService) {
    this.loading = false;
    this.confirmResetPasswordInput = {
      username: '',
      newPassword: '',
      confirmationCode: '',
    };
  }

  public confirmNewPassword(): void {
    this.loading = true;
    this.cognitoService.confirmResetPassword(this.confirmResetPasswordInput);
  }

}