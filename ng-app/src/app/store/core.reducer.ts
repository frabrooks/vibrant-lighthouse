import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { ActionReducer, combineReducers, createReducer, on } from '@ngrx/store';

import * as fromNgrxRouter from '@ngrx/router-store';
import * as fromCore from '.';

export const featureKey: 'quadtodo.core' = 'quadtodo.core';

export interface CoreState {
  readonly router: fromNgrxRouter.RouterReducerState<fromNgrxRouter.SerializedRouterStateSnapshot>;
  readonly routeParamRecord: Params | null;
}

const initialCoreState: CoreState = {
  router: {
    state:{
      root: {
        url: [],
        params: {},
        queryParams: {},
        fragment: null,
        data: {},
        outlet: '',
        component: null,
        routeConfig: null,
        title: undefined,
        root: new ActivatedRouteSnapshot,
        parent: null,
        firstChild: null,
        children: [],
        pathFromRoot: [],
        paramMap: undefined as any,
        queryParamMap: undefined as any,
      },
      url: '/',
    },
    navigationId: 0,
  },
  routeParamRecord: null,
};

const routeParamRecordReducer: ActionReducer<Params | null> = createReducer(
  initialCoreState.routeParamRecord,

  on(fromCore.stashRouteParams, (state, { routeParams }) => routeParams),

  on(fromCore.clearRouteParams, () => initialCoreState.routeParamRecord),

);

const coreReducer: ActionReducer<CoreState> = combineReducers<CoreState>({
  router: fromNgrxRouter.routerReducer,
  routeParamRecord: routeParamRecordReducer,
});

export function reducer(state: CoreState | undefined, action: any) {
  return coreReducer(state, action);
}

