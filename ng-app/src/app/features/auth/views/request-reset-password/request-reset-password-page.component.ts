import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetPasswordInput } from 'aws-amplify/auth';
import { Store } from '@ngrx/store';

import { CognitoService } from '../../services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password-page.component.html',
  styleUrls: ['./request-reset-password-page.component.scss'],
})
export class RequestResetPasswordPageComponent {

  loading: boolean;
  resetPasswordInput: ResetPasswordInput;

  constructor(private store: Store, private cognitoService: CognitoService) {
    this.loading = false;
    this.resetPasswordInput = {
      username: '',
    };
  }

  public requestResetPassword(): void {
    this.loading = true;
    this.cognitoService.requestResetPassword(this.resetPasswordInput);
  }

}