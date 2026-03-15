import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { VerifyTOTPSetupInput } from 'aws-amplify/auth';
import { Store } from '@ngrx/store';

import * as QRCode from 'qrcode';

import { CognitoService } from '../../services/cognito.service';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';
import { SetupTotpPageViewModel, selectSetupTotpPageViewModel } from './setup-totp-page.selector';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextInputComponent
  ],
  selector: 'app-setup-totp',
  templateUrl: './setup-totp-page.component.html',
  styleUrls: ['./setup-totp-page.component.scss'],
})
export class SetupTotpPageComponent implements OnInit {

  public vm$: Observable<SetupTotpPageViewModel> = this.store.select(selectSetupTotpPageViewModel);

  public totpQRCodeSrc: string = '';

  loading: boolean;
  verifyTotpSetupInput: VerifyTOTPSetupInput;

  constructor(private store: Store,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.verifyTotpSetupInput = {
      code: '',
    };
  }

  ngOnInit(): void {
    this.vm$.pipe(first((vm: SetupTotpPageViewModel) => !!vm.sharedSecret)).subscribe((vm: SetupTotpPageViewModel) => {
      this.generateQRCode(vm.sharedSecret as string);
    });
  }

  public verifyTotpSetup(): void {
    this.loading = true;
    this.cognitoService.verifyTotpSetup(this.verifyTotpSetupInput);
  }


  generateQRCode(sharedSecret: string) {
    const otpAuthUrl = `otpauth://totp/QuadTodo?secret=${sharedSecret}&issuer=QuadTodo`;
    QRCode.toDataURL(otpAuthUrl, (err: any, url: any) => {
      if (err) {
        console.error('Error generating QR code', err);
        return;
      }
      this.totpQRCodeSrc = url;
    });
  }

}