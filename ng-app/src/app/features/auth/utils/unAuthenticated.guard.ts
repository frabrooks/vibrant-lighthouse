import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs';

import * as fromAuth from '../store';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  console.log('isNotAuthenticatedGuard');

  const router = inject(Router);
  const store = inject(Store);
  return store.select(fromAuth.selectIsAuthenticated).pipe(
    first((isAuthenticated) => isAuthenticated !== null),
    map((isAuthenticated) => {
      console.log('isNotAuthenticatedGuard', isAuthenticated);
      if (isAuthenticated) {
        return router.parseUrl('/home');
      } else {
        return true;
      }
    })
  );
};

