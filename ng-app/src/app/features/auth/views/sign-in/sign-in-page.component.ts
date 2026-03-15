import { ChangeDetectorRef, Component } from '@angular/core';
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
import { SignInPageViewModel, selectSignInPageViewModel } from './sign-in-page.selector';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-sign-in',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {

  public vm$: Observable<SignInPageViewModel> = this.store.select(selectSignInPageViewModel);

  loading: boolean = false;
  username: string = '';
  password: string = '';

  showPassword: boolean = false;

  constructor(private store: Store, private actions: Actions, private cognitoService: CognitoService) {
    this.actions.pipe(ofType(fromAuth.signInError), takeUntilDestroyed()).subscribe(() => {
      this.loading = false;
      this.password = '';
    });
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.storePasswordInSessionForDurationOfAuthenticationFlow(this.password);
    this.cognitoService.signIn({ username: this.username, password: this.password });
  }

}

