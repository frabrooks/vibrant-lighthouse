import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { CognitoService } from 'src/app/features/auth/services/cognito.service';
import { environment } from 'src/environments/environment';

import * as fromAuth from 'src/app/features/auth/store';
import { FormsModule } from '@angular/forms';
import { GridComponents } from 'src/app/shared/components/grid/grid.component';
import { CvaTextAreaComponent } from 'src/app/shared/form-components/cva-text-area/cva-text-area.component';
import { CvaTextInputComponent } from 'src/app/shared/form-components/cva-text-input/cva-text-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ...GridComponents,
    CvaTextAreaComponent,
    CvaTextInputComponent],
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public textAreaValue: string = '';
  public textInputValue: string = '';

  public response: string = '';

  constructor(private store: Store, private http: HttpClient, private cognitoService: CognitoService) { }

  ngOnInit(): void {
  }


  public testAuth(): void {

    this.store.select(fromAuth.selectAccessToken).pipe(first()).subscribe((accessToken) => {
      let headers = new HttpHeaders({ 'Authorization':  `Bearer ${accessToken}`});
      this.http.get<string>(`${environment.apiurl}/auth-test`, {headers: headers}).pipe(first()).subscribe((v: any) => {
        this.response = v.message;
      })
    });

  }

  public setUpTOTP(): void {
    this.cognitoService.setUpTOTP();
  }

}
