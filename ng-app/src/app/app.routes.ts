import { Routes } from "@angular/router";

import { isAuthenticatedGuard } from "./features/auth/utils/isAuthenticated.guard";
import { isNotAuthenticatedGuard } from "./features/auth/utils/unAuthenticated.guard";

import { SplashComponent } from "./features/splash/splash.component";
import { TodoComponent } from "./features/todo/views/todo/todo.component";


export const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routes')
  },
  {
    path: 'home',
    component: TodoComponent,
    canActivate: [isAuthenticatedGuard]
  }
];

