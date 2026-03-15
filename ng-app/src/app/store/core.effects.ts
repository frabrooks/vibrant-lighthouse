import { Injectable } from "@angular/core";
import { GuardsCheckEnd, NavigationStart, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromNgrxRouter from '@ngrx/router-store';
import * as fromCore from '.';

@Injectable()
export class CoreEffects {
  constructor(private store: Store, private actions: Actions, private router: Router) {}

  public stashRouteParams$ = createEffect(() => this.actions.pipe(
    ofType(fromNgrxRouter.ROUTER_NAVIGATION),
    switchMap(() => this.router.events),
    filter(event => event instanceof NavigationStart),
    withLatestFrom(this.store.select(fromCore.selectRouteParams)),
    map(([_, routeParams]) => fromCore.stashRouteParams({ routeParams })),
  ));

  public clearStashedRouteParams$ = createEffect(() => this.actions.pipe(
    ofType(fromNgrxRouter.ROUTER_NAVIGATION),
    switchMap(() => this.router.events),
    filter(event => event instanceof GuardsCheckEnd),
    map(() => fromCore.clearRouteParams()),
  ));
}
