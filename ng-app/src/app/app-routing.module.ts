import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';
import { IsNotAuthenticatedGuard } from './auth/guards/unAuthenticated.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SplashComponent } from './core/splash/splash.component';
import { TodoComponent } from './todo/views/todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
    pathMatch: 'full',
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'todos',
    component: TodoComponent,
    canActivate: [IsAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
