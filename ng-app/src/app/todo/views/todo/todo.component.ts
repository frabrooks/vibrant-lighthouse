import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CognitoService } from 'src/app/auth/cognito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public response: string = '';

  constructor(private http: HttpClient, private cognitoService: CognitoService) { }

  ngOnInit(): void {
  }


  public testAuth(): void {
    this.cognitoService.auth$.pipe(first()).subscribe((auth) => {

      let headers = new HttpHeaders({ 'Authorization':  `Bearer ${auth?.accessToken?.jwtToken}`});
      this.http.get<string>(`${environment.apiurl}/auth-test`, {headers: headers}).pipe(first()).subscribe((v: any) => {
        this.response = v.message;
      })
    });
  }

}
