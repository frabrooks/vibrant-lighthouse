import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Params } from "@angular/router";

import * as fromNgrxRouter from '@ngrx/router-store';
import * as fromCore from '.';

export const selectCoreState = createFeatureSelector<fromCore.CoreState>(fromCore.featureKey);

export const selectNgrxRouterState = createSelector(selectCoreState, (state): fromNgrxRouter.RouterReducerState<fromNgrxRouter.SerializedRouterStateSnapshot> => state.router);

const selectRouteParamRecord = createSelector(selectCoreState, (state): Params | null => state.routeParamRecord);

const { selectCurrentRoute, selectFragment, selectQueryParams, selectRouteParams, selectRouteParam, selectRouteData, selectUrl } = fromNgrxRouter.getRouterSelectors(selectNgrxRouterState);

export { selectCurrentRoute, selectFragment, selectQueryParams, selectRouteParams, selectRouteData, selectUrl };

const _selectRouteParam = (key: string) => createSelector(
  selectRouteParamRecord,
  selectRouteParam(key),
  (routeParamRecord, routeParam) => routeParamRecord ? routeParamRecord[key] : routeParam
);
export { _selectRouteParam as selectRouteParam };




