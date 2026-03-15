import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CognitoService } from 'src/app/features/auth/services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';
import { SignUpPageViewModel, selectSignUpPageViewModel } from './sign-up-page.selector';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-sign-up',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  public vm$: Observable<SignUpPageViewModel> = this.store.select(selectSignUpPageViewModel);

  loading: boolean = false;
  showPassword: boolean = false;

  username: string = ''; // (email)
  password: string = '';
  phoneNumber: string = '';

  constructor(private store: Store, private cognitoService: CognitoService) {}

  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp({
      username: this.username,
      password: this.password,
      options: {
      userAttributes: {
        email: this.username,
        phone_number: this.phoneNumber
      },
      autoSignIn: true
      }
    });
  }

}
