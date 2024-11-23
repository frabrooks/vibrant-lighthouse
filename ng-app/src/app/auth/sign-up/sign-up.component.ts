import { Component, OnInit } from '@angular/core';
import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
  }

  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.loading = false;
    })
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/sign-in']);
    }).catch(() => {
      this.loading = false;
    });
  }


}
