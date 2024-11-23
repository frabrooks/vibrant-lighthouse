import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoTestComponent } from './todo-test/todo-test.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { SplashComponent } from './core/splash/splash.component';
import { TodoComponent } from './todo/views/todo/todo.component';

@NgModule({ declarations: [
        AppComponent,
        TodoTestComponent,
        SignUpComponent,
        SignInComponent,
        ProfileComponent,
        SplashComponent,
        TodoComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
