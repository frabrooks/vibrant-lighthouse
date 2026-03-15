import { ActionReducerMap } from "@ngrx/store";

import * as fromCore from 'src/app/store';
import * as fromAuth from 'src/app/features/auth/store';

export interface ApplicationState {
  [fromCore.featureKey]: fromCore.CoreState;
  [fromAuth.featureKey]: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  [fromCore.featureKey]: fromCore.reducer,
  [fromAuth.featureKey]: fromAuth.reducer,
};


export const metaReducers = [];



