import { createAction, props } from "@ngrx/store";
import { Params } from "@angular/router";

export const stashRouteParams = createAction('[Core] Stash Route Params', props<{ routeParams: Params }>());

export const clearRouteParams = createAction('[Core] Clear Route Params');

export const switchNgrxRouterStoreToRequestedRoute = createAction('[Core] Switch Ngrx Router Store To Requested Route');


