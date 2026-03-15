import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import * as fromAuth from '../../store';

import { CognitoService } from '../../services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';
import { PasswordlessSignInPageViewModel, selectPasswordlessSignInPageViewModel } from './passwordless-sign-in-page.selector';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-passwordless-sign-in',
  templateUrl: './passwordless-sign-in-page.component.html',
  styleUrls: ['./passwordless-sign-in-page.component.scss'],
})
export class PasswordlessSignInPageComponent {

  public vm$: Observable<PasswordlessSignInPageViewModel> = this.store.select(selectPasswordlessSignInPageViewModel);

  loading: boolean = false;
  username: string = '';

  constructor(private store: Store, private actions: Actions, private cognitoService: CognitoService) {
    this.actions.pipe(ofType(fromAuth.signInError), takeUntilDestroyed()).subscribe(() => {
      this.loading = false;
    });
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn({ username: this.username, options: { authFlowType: 'USER_AUTH', autoSignIn: true } });
  }

}

